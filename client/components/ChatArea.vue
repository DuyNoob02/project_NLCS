<template>
    <div class="h-[620px]  w-full   border bg-slate-200  bottom-10 flex flex-col scroll ">
        <div class="mb-auto flex justify-between bg-cyan-500 px-2 py-2">
            <h2 class=" text-lg">{{ userName }}</h2>

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
    // console.log(container);
    if (container) {
        // console.log(container.scrollHeight);
        container.scrollTop += Number(container.scrollHeight);
        // container.scrollTop +=  container.scrollHeight + Number(40);
        // container.scrollTop = container.scrollHeight  + 400

        // console.log(container.scrollTop);
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

watch([() => props.senderId, () => props.recipientId, () => props.userName],
    ([newSenderId, newRecipientId], [oldSenderId, oldRecipientId]) => {
        if (newSenderId !== oldSenderId || newRecipientId !== oldRecipientId) {
            // Reset data or fetch new data based on new senderId and recipientId
            // Ví dụ:
            messages.value = [];
            socket.emit('get-message-history', { sender: newSenderId, recipient: newRecipientId });
        }
        // if(newUserName !== oldUserName){
        //     recipientName = newUserName
        // }
    });
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

const closeBoxChat = () => {
    visible.value = false
}
</script>

<style lang="scss" scoped></style>