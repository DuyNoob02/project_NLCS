<template>
    <div>
        <header class="flex items-center justify-between border-b-2  drop-shadow-lg">
            <NuxtLink to="/admin" class="ml-20 text-3xl font-medium uppercase  py-5 cursor-pointer">Alpha Admin</NuxtLink>
            <!-- <div class="group relative">
                <div class="mr-20">
                    <button class="border p-3 rounded-md hover:bg-slate-300 hover:text-slate-50 cursor-pointer"
                        @click="toggleDropdown">
                        {{ adminName }}
                    </button>
                </div>
                <div v-if="dropdownOpen"
                    class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 invisible">
                    <ul class="py-2">
                        <li>
                            <NuxtLink :to='`/accountManagement/`' class="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                Tài khoản
                            </NuxtLink>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                Settings
                            </a>
                        </li>
                        <li>
                            <p @click="logout" class="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
                                Đăng xuất
                            </p>
                        </li>
                    </ul>
                </div>
            </div> -->

            <div class="relative group">
                <button @click="toggleDropdown"
                    class="flex p-2 mr-20 items-center space-x-2 focus:outline-none border border-cyan-500 rounded-md font-medium">
                    <span class="text-sm pr-2 border-r-2">{{ adminName }}</span>
                    <svg class="w-4 h-4 hover:bg-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div v-if="dropdownOpen"
                    class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 invisible">
                    <ul class="py-2">
                        <li>
                            <p @click="logout" class="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
                                Đăng xuất
                            </p>
                        </li>
                    </ul>
                </div>
            </div>

        </header>

        <div class="grid grid-cols-6 mt-10">
            <div class="cols-span-1 border-r-2">
                <ul class="flex flex-col">
                    <NuxtLink to="/admin" class="py-3 pl-5 group   cursor-pointer"
                    :class="{ 'bg-slate-600 text-white py-2 px-2 ': activeLink === 'home' }" @click="selectedLink('home')">
                        Trang chủ
                    </NuxtLink>
                    <NuxtLink to="/admin/pendingPost"
                        class="py-3 pl-5 group   cursor-pointer"
                        :class="{ 'bg-slate-600 text-white py-2 px-2 ': activeLink === 'pending' }" @click="selectedLink('pending')">
                        Bài đăng chờ duyệt
                    </NuxtLink>
                    <NuxtLink to="/admin/allPost"
                        class="py-3 pl-5 group   cursor-pointer"
                        :class="{ 'bg-slate-600 text-white py-2 px-2 ': activeLink === 'allpost' }" @click="selectedLink('allpost')">
                        Tất cả bài đăng
                    </NuxtLink>
                    <NuxtLink to="/admin/userManagement"
                        class="py-3 pl-5 group   cursor-pointer"
                        :class="{ 'bg-slate-600 text-white py-2 px-2 ': activeLink === 'user' }" @click="selectedLink('user')">
                        Người dùng
                    </NuxtLink>
                    <NuxtLink to="/admin/pendingDelete"
                        class="py-3 pl-5 group   cursor-pointer"
                        :class="{ 'bg-slate-600 text-white py-2 px-2 ': activeLink === 'pendingDel' }" @click="selectedLink('pendingDel')">
                        Bài đăng chờ xóa
                    </NuxtLink>
                </ul>


            </div>
            <div class="col-span-5 mx-10">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
const activeLink = ref('home')


const dropdownOpen = ref(false);
const toggleDropdown = () => {
    console.log('dropdown');
    dropdownOpen.value = !dropdownOpen.value;
};

const adminName = localStorage.getItem('userName')

const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    try {
        await useFetch('http://localhost:3001/api/user/logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                "refreshToken": refreshToken
            }
        })
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userName')
        localStorage.removeItem('userID')
        navigateTo('/')
    } catch (error) {
        console.log(error);
    }
}


const selectedLink = (link) => {
    activeLink.value = link
}

</script>

<style  scoped>
.invisible {
    visibility: visible;
}
</style>