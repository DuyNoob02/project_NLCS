<template>
    <div class="grid grid-cols-4 mt-40">
        <div class="col-span-2"></div>
        <div class=" col-span-2 border max-w-md rounded-lg mb-5">
            <form class="space-y-4 md:space-y-6 py-3 px-3" action="#">
                <h2 class="font-medium text-2xl border-b-2 border-slate-200 pb-2">Tạo tài khoản mới</h2>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tên người dùng</label>
                    <input type="text" name="fullName " id="fullName" v-model="fullName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập tên của bạn" required="">
                </div>
                <div>
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Phone number</label>
                    <input type="tel" name="phoneNumber" id="phoneNumber" v-model="phoneNumber"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập số điện thoại của bạn" required="">
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email</label>
                    <input type="email" name="email" id="email" v-model="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập email của bạn" required="">
                </div>
                <div>
                    <label for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required="">
                </div>
                <button type="button" @click="handleSubmit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Đăng ký
                </button>
                <button type="submit"
                    class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                    in</button>
            </form>
        </div>


    </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const fullName = ref('')
const phoneNumber = ref('')
const password = ref('')
const email = ref('')


const handleSubmit = async () => {
    const formData =  {
        fullName: fullName.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
        email: email.value
    }
    try {
        const response = await useFetch('http://localhost:3001/api/user/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        })
        console.log(response.status);
        if(response.status.value == 'success'){
            router.push('/login')
        }
    } catch (error) {
        return error;
    }

}


</script>

<style lang="scss" scoped></style>