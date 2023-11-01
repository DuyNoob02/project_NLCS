<template>
  <div class="flex flex-col">
    <nav
      class="drop-shadow-md bg-amber-50 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <NuxtLink to="/" @click="selectedLink('')">
          
          <img class="w-32 object-cover" src="/alpha.png" alt="Store logo" />
          
        </NuxtLink>

        <div class="flex md:order-2">
          <section v-if="!isLoggedIn" @click="selectedLink('')">
            <NuxtLink type="button" to="/signup"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Đăng ký
            </NuxtLink>

            <NuxtLink to="/login" type="button"
              class="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg  ">
              Đăng nhập
            </NuxtLink>
          </section>
          <div v-if="isLoggedIn" class="grid grid-cols-2 items-center">

            <!-- <p class="col-span-1" v-if="isLoggedIn">

          </p> -->

            <div class="col-span-1" v-if="isLoggedIn">
              <div class="relative group">
                <button @click="toggleDropdown"
                  class="flex p-1 items-center space-x-2 focus:outline-none  rounded-md font-medium">
                  <span class="text-sm pr-2 border-r-2">{{ userName }}</span>
                  <svg class="w-4 h-4 hover:bg-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div v-if="dropdownOpen"
                  class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-40 invisible">
                  <ul class="py-2">
                    <li>
                      <NuxtLink :to='`/accountManagement/`' class="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Tài khoản
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink :to='`/contact/`' class="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Liên hệ
                      </NuxtLink>
                    </li>
                    <li>
                      <p @click="logout" class="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
                        Đăng xuất
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- <NuxtLink to="/createPost" type="button"
            class=" col-span-1 inline-block  ml-2 bg-transparent hover:bg-green-500 text-green-400 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-lg  ">
            Đăng bài
          </NuxtLink> -->
            <NuxtLink to="/createPost" type="button" @click="selectedLink('')"
              class="max-w-max py-1 px-2 ml-3 bg-transparent hover:bg-green-500 text-green-400 font-semibold hover:text-white border border-green-500 hover:border-transparent rounded-lg">
              Đăng bài
            </NuxtLink>

          </div>

          <!-- <button data-collapse-toggle="navbar-sticky" type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button> -->
        </div>
        <div class="flex gap-5  items-center">
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul
              class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <NuxtLink to="/" class="block py-1  rounded md:px-3 md:dark:text-blue-500"
                :class="{ 'bg-amber-100 underline text-black  ': activeLink === 'home' }" @click="selectedLink('home')">
                Home</NuxtLink>
              <NuxtLink to="/search/rent" class="block py-1  rounded md:px-3 md:dark:text-blue-500"
                :class="{ 'bg-amber-100 underline text-black ': activeLink === 'rent' }" @click="selectedLink('rent')">
                Cho thuê</NuxtLink>
              <NuxtLink to="/search/sell" class="block py-1  rounded md:px-3 md:dark:text-blue-500"
                :class="{ 'bg-amber-100 underline text-black ': activeLink === 'sell' }" @click="selectedLink('sell')">
                Bán</NuxtLink>
              <NuxtLink to="/allPost" class="block py-1  rounded md:px-3 md:dark:text-blue-500"
                :class="{ 'bg-amber-100 underline text-black px-3 ': activeLink === 'allPost' }" @click="selectedLink('allPost')">
                Bài đăng mới</NuxtLink>
              
              <!-- <NuxtLink to="about"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Cho thuê</NuxtLink>
              <NuxtLink to="/"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Bán</NuxtLink>
              <NuxtLink to="/allPost"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Bài đăng mới</NuxtLink> -->
            </ul>

          </div>
          <!-- <div class="w-[400px]">
            <Search />
          </div> -->
        </div>

      </div>
    </nav>
    <!-- <div class="flex justify-center items-center mt-40 border-b-2 pb-4  ">
      <form class="mx-96 w-full ">
        <div class="flex relative">
          <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your
            Email</label>
          <button id="dropdown-button" data-dropdown-toggle="dropdown" @click="toggleDropdownSearch"
            class="relative w-28 flex-shrink-0 z-10 inline-flex justify-center  items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button">
            {{ selectedOption }}
            <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <div id="dropdown" v-if="dropdownSearch"
            class="absolute  z-10  top-10 bg-slate-300  divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 invisible">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 absolute " aria-labelledby="dropdown-button">
              <li>
                <button type="button" @click="selectOption('Tất cả')"
                  class="inline-flex w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Tất
                  cả</button>
              </li>
              <li>
                <button type="button" @click="selectOption('Bán')"
                  class="inline-flex w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Bán</button>
              </li>
              <li>
                <button type="button" @click="selectOption('Cho thuê')"
                  class="inline-flex w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cho
                  thuê</button>
              </li>

            </ul>
          </div>
          <div class="relative w-full">
            <input type="search" id="search-dropdown" v-model="searchQuery"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Chung cư, Nhà ở, Đất nền..." required>
            <button type="button" @click="handleSubmit"
              class="absolute top-0 right-0 p-3 px-5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isLoggedIn, login, userName } from '../composables/auth';
import 'flowbite';


const route = useRouter()
const dropdownOpen = ref(false);
const activeLink = ref('')
const toggleDropdown = () => {
  console.log('dropdown');
  dropdownOpen.value = !dropdownOpen.value;
};
const refreshToken = localStorage.getItem('refreshToken')
const logout = async () => {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userName')
  localStorage.removeItem('userID')
  const response = await useFetch('http://localhost:3001/api/user/logout', {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      "refreshToken": refreshToken
    }
  })
  window.location.reload();
  router.push('/login')

}


const selectedLink = (link) => {
  activeLink.value = link
}
</script>

<style>
.invisible {
  visibility: visible;
}
</style>
