<template>
    <div class="w-full h-full min-h-screen mt-16 z-10 fixed inset-0 bg-amber-50 p-3">
        <div class="grid grid-cols-6">
            <div class="col-span-1 ml-5">
                <h2 class="text-2xl uppercase ">Danh sách liên hệ</h2>
                <div v-if="NotFound">Không có kết quả phù hợp</div>
                <div v-else>
                <div v-for="contact in ContactList" :key="contact">
                    <ul class="cursor-pointer">
                        <li @click="selectContact(contact)" class="group hover:bg-slate-400 px-2 py-4">
                            {{ contact.fullName }}
                        </li>
                    </ul>
                </div>
            </div>
            </div>
            <div class="col-span-5 ml-5">
                <ChatArea  v-if="selectedContact" :senderId="userID" :recipientId="selectedContact._id"
                :userName="selectedName" />
            </div>
        </div>

    </div>
    <!-- <div class="mt-40 grid grid-cols-6 ">
        <div class="col-span-1 ml-5">
            <h2 class="text-2xl uppercase">Danh sách liên hệ</h2>
            <div v-if="NotFound">Không có kết quả phù hợp</div>
            <div v-else>
                <div v-for="contact in ContactList" :key="contact">
                    <ul class="cursor-pointer">
                        <li @click="selectContact(contact)" class="group hover:bg-slate-400 px-2 py-4">
                            {{ contact.fullName }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-span-5 ">
            <ChatArea  v-if="selectedContact" :senderId="userID" :recipientId="selectedContact._id"
                :userName="selectedContact.fullName" />
        </div>
    </div> -->
</template>
<script setup>
import { ref, onMounted } from 'vue';
const ContactList = ref([])
const selectedContact = ref(null)
const NotFound = ref(false)
const userID = localStorage.getItem('userID')
const getContactList = async (userID) => {
    try {
        const result = await useFetch(`http://localhost:3001/api/user/getContactList/${userID}`, {
            method: "GET"
        })
        if (!result) {
            NotFound.value = true
        }
        // console.log(result.data.value.InforContact);
        ContactList.value = result.data.value.InforContact
        console.log(ContactList.value);

        // return ContactList.value
    } catch (error) {
        console.log(error);
    }
}

const selectedName = ref('')
const selectContact = (contact) => {
    console.log(contact);
    selectedContact.value = contact
    selectedName.value = selectedContact.value.fullName
    // console.log('select',selectedContact.value.fullName);
}

onMounted(async () => {
    await getContactList(userID);
})


</script>

<style lang="scss" scoped></style>