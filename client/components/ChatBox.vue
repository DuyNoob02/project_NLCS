<template>
    <!-- <div class=" min-w-[300px] min-h-[400px] border bg-slate-200 z-10 right-10 bottom-10 fixed ">
        <div>
            <h2 class="bg-cyan-500 px-2 py-2 text-lg">{{ recipientName }}</h2>
        </div>
        <div class="w-full"></div>
        <div class="flex-grow mb-0">
            <input type="text" class="w-full p-2 border border-gray-300 rounded">
        </div>
    </div> -->
    <div v-if="visible" class="w-80 h-96 border bg-slate-200 z-10 right-10 bottom-10 fixed flex flex-col scroll">
        <div class="mb-auto flex justify-between bg-cyan-500 px-2 py-2">
            <h2 class=" text-lg">{{ recipientName }}</h2>
            <button @click="closeBoxChat()" class=" mr-2 hover:bg-slate-300 rounded-full py-1.5 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em"
                    viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
            </button>
        </div>

        <!-- <div v-if="isLoading == true" class="flex items-center justify-center h-full">Loading...</div> -->
        <div class="mt-auto p-2 overflow-y-auto   " ref="messageContainer">
            <div v-for="msg in messages" :key="msg._id" class="mb-2">
                <div class="">
                    <!-- <span v-if="msg.sender === senderId " class="right-0" >You: <br/></span>
                    <span v-else>{{ recipientName }}: <br/></span> -->
                    <div v-if="msg.sender === recipientId" class="flex ">
                        <p class="border-spacing-1 bg-slate-400 py-2 rounded-md px-1 ">
                        <p class="text-xs">{{ formatTimeAgo(msg.createdAt) }}</p>
                        {{ msg.content }}
                        </p>
                        <!-- <p>{{ msg.recipientName }}</p> -->
                    </div>
                    <div v-else class="flex justify-end">
                        <p class="border-spacing-1 bg-blue-500 py-2 rounded-md px-1  ">
                        <p class="text-xs">{{ formatTimeAgo(msg.createdAt) }}</p>
                        {{ msg.content }}
                        </p>
                        <!-- <p>{{ msg.recipientName }}</p> -->
                    </div>
                </div>

            </div>
        </div>
        <div class="mt-auto">
            <form class="flex flex-row " @submit.prevent="sendMessage">
                <input v-model="message" type="text" class="w-full p-2 border border-gray-300 rounded">
                <button class="w-20 w-ful bg-blue-500">Gửi</button>
            </form>

        </div>
    </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { formatTimeAgo } from '../composables/formatTime';
import io from 'socket.io-client'
const socket = io('http://localhost:3001/')


const messageContainer = ref(null)
const scrollChat = () => {
    const container = messageContainer.value;
    console.log(container);
    if (container) {
        console.log(container.scrollHeight);
        container.scrollTop += Number(container.scrollHeight);
        // container.scrollTop +=  container.scrollHeight + Number(40);
        // container.scrollTop = container.scrollHeight  + 400

        console.log(container.scrollTop);
    }
    // console.log(messageContainer.value);
    // messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
}



// socket.emit('connection')
const props = defineProps({
    senderId: {
        type: String,
        required: true
    },
    recipientId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
})
const recipientName = props.userName
console.log(recipientName);
const message = ref('')
const messages = ref([])


// const isLoading = ref(true)
// isLoading.value = true
onMounted(() => {
    setTimeout(async () => {
        scrollChat()
    }, 100)
})




const sendMessage = (e) => {
    console.log('send');
    e.preventDefault();

    if (message.value.trim() !== '') {
        // console.log(message.value);
        const createdAt = new Date()
        const msg = {
            sender: props.senderId,
            recipient: props.recipientId,
            content: message.value,
            createdAt: createdAt
        };
        socket.emit('chat-message',
            msg
        )
        messages.value.push({ ...msg })
        // console.log(msg);
        message.value = '';
        setTimeout(() => {
            scrollChat();
        }, 100);
    }
}

// console.log(props.senderId);

// onMounted(() => {

// }),

//Lấy lịch sử tin nhắn khi component được tạo
socket.emit('get-message-history', {
    sender: props.senderId,
    recipient: props.recipientId
});

//Nghe sự kiện nhận tin nhắn từ server
socket.on('receive-msg', (msg) => {
    console.log('receive', { ...message.value, msg });
    messages.value.push({ ...msg })
    // console.log("rc msg" + message.value);
})
console.log("rc msg" + message.value);

socket.on('receive-message-history', (history) => {
    messages.value = history;
    console.log(message.value);
})

const visible = ref(true)
const closeBoxChat = () => {
    visible.value = false
}
</script>

<style lang="scss" scoped></style>