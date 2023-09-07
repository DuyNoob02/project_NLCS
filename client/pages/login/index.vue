<template>
    <div class="grid grid-cols-4 mt-40">
        <div class="col-span-2">1</div>
        <div class=" col-span-2 border max-w-md rounded-lg">
            <form class="space-y-4 md:space-y-6 py-3 px-3" action="#">
                <h2 class="font-medium text-2xl border-b-2 border-slate-200 pb-2">Welcome to Alpha</h2>
                <div>
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Phone number</label>

                    <input type="tel" name="email" id="email" v-model="phoneNumber"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập số điện thoại của bạn" required="">

                </div>
                <div>
                    <label for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required="">
                </div>
                <p v-if="loginError" class="text-red-500"> Thông tin đăng nhập không hợp lệ</p>
                <button type="button" @click="handleSubmit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Đăng nhập
                </button>
                <button type="submit"
                    class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                    in</button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <NuxtLink to="/signup"
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                        up</NuxtLink>
                </p>
            </form>
        </div>


    </div>
</template>

<script setup>

import { login, setUserName } from '/composables/auth.js';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const phoneNumber = ref('');
const password = ref('')
const loginError = ref(false);
const handleSubmit = async () => {
    const formData = {
        phoneNumber: phoneNumber.value,
        password: password.value,
    }

    try {
        const response = await useFetch(('http://localhost:3001/api/user/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData
        })
        console.log(">>> in ra role", response.data);
        if (response.data.value.status == '401' || response.data.value.status == '500') {
            loginError.value = true
        }
        else if(response.data.value.data.role === 'admin'){
            localStorage.setItem('accessToken', response.data.value.data.accessToken);
            // console.log(response.data.value.refreshToken);
            localStorage.setItem('userID', response.data.value.data.userID)
            localStorage.setItem('refreshToken', response.data.value.data.refreshToken);
            localStorage.setItem('userName', response.data.value.data.fullName);
            alert('Đăng nhập với vai trò Admin')
            login()
            setUserName(response.data.value.data.fullName)
            router.push('/admin')
        }
        else {
            loginError.value = false
            console.log(response);
            console.log(response.data.value.data.accessToken);
            console.log(response.data);
            localStorage.setItem('accessToken', response.data.value.data.accessToken);
            // console.log(response.data.value.refreshToken);
            localStorage.setItem('userID', response.data.value.data.userID)
            localStorage.setItem('refreshToken', response.data.value.data.refreshToken);
            localStorage.setItem('userName', response.data.value.data.fullName);
            alert('Đăng nhập thành công')
            login()
            setUserName(response.data.value.data.fullName)
            router.push('/')
        }
    } catch (error) {
        console.log(error);
        loginError.value = true
    }
}
</script>

<style lang="scss" scoped></style>