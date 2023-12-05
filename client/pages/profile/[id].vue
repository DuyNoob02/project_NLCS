<template>
    <div class="mt-40 content z-0 min-h-screen-">
        <div class="">
            <img src="/cover.png" alt="" class="absolute -z-10">
            <div class="inset-0 grid grid-cols-8 items-center justify-center bg-slate-300 bg-opacity-50 text-white p-8">
                <div class="col-span-1"></div>
                <div class="col-span-6 grid grid-cols-6 mt-32 bg-slate-100 px-10">
                    <div class="col-span-6 flex flex-col items-center justify-center mb-10 ">
                        <img class="mt-5 mb-3 w-32  rounded-full" :src="`${userInfo.image}`" alt="">
                        <p class="mt-2 font-medium text-black text-lg">{{ userInfo.fullName }}</p>
                        <button class="bg-blue-500 text-white px-5 py-2 rounded-md cursor-pointer">{{ userInfo.phoneNumber
                        }}</button>
                        <div class="border-b border-black w-full mt-5"></div>

                        <h2 class="text-black font-medium text-xl my-5">Danh sách tin đăng bán</h2>
                        <div class="grid grid-cols-6">
                            <!-- <div v-for="item in PostofUser" :key="item._id" class="mb-3 col-span-2 mx-10 my-10">
                                <NuxtLink :to="`/detail/${item._id}`" class="w-full rounded   ">
                                    <div class=" hover:drop-shadow-xl border-2">
                                        <img class="w-full h-60 bg-cover object-cover p-2" :src='`${item.images[0]}`'
                                            alt="">
                                        <div class="">
                                            <div class="p-3">

                                                <h4 class="font-bold text-black text-xl mb-2 line-clamp-1">{{ item.name }}
                                                </h4>

                                                <p class="font-medium text-red-500 mt-2">{{ formatInput(item.price) }}</p>
                                                <p class="flex items-start text-black h-12">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                    </svg>
                                                <div class="line-clamp-2">
                                                    <p>
                                                        {{ item.address }}
                                                    </p>
                                                </div>
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                </NuxtLink>
                            </div> -->
                            <div v-for="item in PostofUser" :key="item._id" class="mb-3 col-span-2 mx-10 my-10">
                                <div v-if="!item.pending" class="w-full rounded group relative">
                                    <div 
                                        class="border-2  hover:scale-105 transition-transform ">
                                        <NuxtLink :to="`/detail/${item._id}`">
                                            <img class="w-full h-60 bg-cover object-cover p-2" :src="`${item.images[0]}`"
                                                alt="">
                                            <div class="">
                                                <div class="p-3">
                                                    <h4 class="font-bold text-black text-xl mb-2 line-clamp-1">{{ item.name
                                                    }}
                                                    </h4>
                                                    <p class="font-medium text-red-500 mt-2">{{ formatInput(item.price) }}
                                                    </p>
                                                    <p class="flex items-start text-black h-12">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                            class="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                        </svg>
                                                    <div class="line-clamp-2">
                                                        <p>
                                                            {{ item.address }}
                                                        </p>
                                                    </div>
                                                    </p>
                                                </div>
                                            </div>
                                        </NuxtLink>

                                        <div v-if="currentUser === userInfo._id"
                                            class="opacity-0 group-hover:opacity-100 transition-opacity inset-0 flex items-center justify-center">
                                            <NuxtLink :to="`/profile/update/${item._id}`"
                                                class="detail-button bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">
                                                Chỉnh sửa
                                            </NuxtLink>
                                            <button @click="deleteItem(item._id)"
                                                class="delete-button bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-span-1"></div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { formatInput } from '../../composables/convertPrice';


const route = useRoute()
const id = route.params.id

const { data: getUserInfo } = await useFetch(`http://localhost:3001/api/user/getInfoUser/${id}`, {
    method: "GET",
})
// console.log(getUserInfo);
const userInfo = getUserInfo.value;
console.log(userInfo);

const { data: GetPostofUser } = await useFetch(`http://localhost:3001/api/item/getPostbyUserId/${id}`, {
    method: "GET",
})
const PostofUser = GetPostofUser.value
console.log(PostofUser);

const deleteItem = async (itemID) => {
    try {
        const response = await useFetch(`http://localhost:3001/api/item/${itemID}`, {
            method: 'DELETE'
        })
        console.log(response);
        if (response.status.value === 'success') {
            alert('Xóa bài viết thành công!')
            window.location.reload()
        }
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

const currentUser = localStorage.getItem('userID')
console.log(currentUser);



</script>

<style  scoped></style>