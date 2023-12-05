<template>
    <div class="mt-40 grid grid-cols-9">
        <div class="col-span-3 grid grid-cols-3">
            <div class="col-span-1">
            </div>
            <div class="col-span-2 grid-cols-2 max-w-sm rounded overflow-hidden shadow-lg mr-5">
                <img v-if="isAVT" class="h-40 w-40 object-cover mx-auto rounded-full" :src='`${userInfo.image}`' alt="">
                <img v-else class="w-44 mx-auto rounded"
                    src="https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
                    alt="Profile Picture Default Png@nicepng.com">
                <div class="text-center">
                    <p class="mt-5 font-bold text-xl">{{ fullName }}</p>
                    <div class="mt-3">Môi giới cá nhân</div>
                </div>
            </div>
        </div>
        <div class="col-span-6  rounded overflow-hidden shadow-lg   ">
            <div class=" mx-5 my-3">
                <h2 class="font-bold text-xl uppercase">Thông tin tài khoản</h2>
                <div class="grid grid-cols-6">
                    <label for="avatar relative">

                        <div v-if="isLoading" class=" bg-slate-200 fixed z-10 flex items-center justify-center flex-col">
                            <span>Loading...</span>
                        </div>
                        <img v-if="isAVT"
                            class="col-span-1 cursor-pointer avatar mb-4 w-60 h-auto bg-cover object-cover rounded-full"
                            :src="`${userInfo.image}`" alt="">

                        <img v-else class="col-span-1 cursor-pointer avatar mb-4" :src="avatarSrc" alt="">
                        <input  type="file" @change="handleFileChange" accept="image/*" name="image" class="rounded-sm bg-black w-28" />
                        <!-- <input class="bg-black w-28 rounded-e-sm" type="file" ref="fileInput" @change="handleFileChange"
                            accept="image/*" name="images" multiple> -->
                        <button v-if="isUpdateAVT" @click="uploadAvatar"
                            class="bg-green-400 rounded-md mt-3 px-3 py-2 ml-3 text-white hover:bg-green-600">Cập nhật</button>
                    </label>


                    <div class="col-span-5 ml-5">
                        <p class="font-bold text-sm">{{ fullName }}</p>
                        <NuxtLink class="cursor-pointer" :to='`/profile/${id}`'>Xem trang cá nhân</NuxtLink>
                    </div>
                </div>
                <form class="mt-10 grid grid-cols-6" action="">
                    <div class="col-span-3">
                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Số điện thoại</label>
                            <input type="tel" v-model="phoneNumber"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg max-w-xs focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>
                        <div class="mt-2">
                            <label for="fullName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Họ và tên</label>
                            <input type="tel" v-model="fullName"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg max-w-xs focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>

                        <div>
                            <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Địa chỉ
                            </label>
                            <input type="address" v-model="address"
                                class="max-w-xs bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                        </div>
                    </div>
                    <div class="col-span-3">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input type="email" v-model="email"
                            class="max-w-xs bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>
                    <button type="button" @click="handleSubmit"
                        class="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Cập nhật
                    </button>
                </form>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const route = useRoute()
const avatarSrc = ref('https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png')

const isAVT = ref(false)
const isUpdateAVT = ref(false)
const isLoading = ref(false)
const id = localStorage.getItem('userID')
const img = ref('')
// console.log(id + 'hihi');

const { data: getUserInfo } = await useFetch(`http://localhost:3001/api/user/getInfoUser/${id}`, {
    method: "GET",
})

const userInfo = getUserInfo.value;
// console.log(userInfo._doc);
// const phoneNumber = ref(userInfo._doc.phoneNumber)
// const fullName = ref(userInfo._doc.fullName)
// const address = ref(userInfo._doc.address)
// const email = ref(userInfo._doc.email)
// if (userInfo._doc.image) {
//     isAVT.value = true
// }
const phoneNumber = ref(userInfo.phoneNumber)
const fullName = ref(userInfo.fullName)
const address = ref(userInfo.address)
const email = ref(userInfo.email)
if (userInfo.image) {
    isAVT.value = true
}


const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('this is change', file);
    isUpdateAVT.value = true;
    img.value = file
};

const handleSubmit = async () => {

    const formData = {
        phoneNumber: phoneNumber.value,
        fullName: fullName.value,
        address: address.value,
        email: email.value,
    }
    try {

        const response = await useFetch(`http://localhost:3001/api/user/update/${id}`, {
            method: 'PUT',
            body: formData
        })
        console.log(response.data.value);
        if (response.data.value.status === 409) {
            alert('Email đã tồn tại')
        } else{
            // console.log(response.data.value.user);
            const user = response.data.value
            console.log(user);
            localStorage.setItem('userName', fullName.value)
            email.value = user.email;
            address.value = user.address;
            // $toast.show('Cap nhat thanh cong');
            alert('Cap nhat thanh cong')
            window.location.reload();
        }
        
    } catch (error) {
        console.log(error);
    }
}



const uploadAvatar = async () => {
    console.log('fnc is working');
    const formData = new FormData();
    formData.append('image', img.value)
    isLoading.value = true;
    try {
        const response = await useFetch(`http://localhost:3001/api/user/updateAvt/${id}`, {
            method: 'PUT',
            headers: {
                // 'Content-Type': 'application',
            },
            body: formData
        });
        console.log(response.status.value);
        if (response.status.value == "success") {
            isLoading.value = true
            // alert('Cập nhật ảnh đại diện thành công!!')
            location.reload()
        }
        avatarSrc.value = response.data.file
    } catch (error) {
        console.log(error);
        isUpdateAVT.value = false
        isLoading.value = false
    }
}

</script>

<style lang="scss" scoped>
.input-container {
    display: inline-block;
}

.edit-icon {
    cursor: pointer;
}
</style>