<template>
    <div class="">
        <h2 class="text-lg uppercase font-medium text-cyan-400">Bài đăng chờ xóa</h2>
        <div v-if="!haveAPost" class="mt-20"> Không có bài đăng chờ xóa </div>
        <div v-else="haveAPost" class="grid grid-cols-4 gap-3 mt-20 max-w-7xl w-full mx-auto">
            <div class="" v-for="item in posts" :key="posts">
                <nuxt-link v-if="item.forDelete != false" class="group">
                    <!-- <div class="max-w-sm rounded overflow-hidden shadow-lg min-h-max h-full">
                        <img class="w-full h-60" :src='`${item.images[0]}`' alt="">
                        <div class="w-full image-cover rounded-t-md">
                            <div
                                class="px-2 pb-6 m-4 w-auto h-5 text-center bg-gray-700 rounded-full text-white float-right group-hover:opacity-25 justify-center items-center">
                                <p class="">{{ item.formality }}</p>
                            </div>
                        </div>
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2 line-clamp-1">{{ item.name }}</div>
                            <p class="text-gray-700 text-base line-clamp-3">
                                {{ item.description }}
                            </p>
                            <p class="font-medium text-red-500 mt-2">{{ formatInput(item.price) }}</p>
                            <p class="flex items-start h-12 line-clamp-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                    stroke="currentColor" class="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                {{ item.address }}
                            </p>
                        </div>

                    </div> -->
                    <div class="border-2  hover:scale-105 transition-transform relative">
                        <img class="w-full h-60 bg-cover object-cover p-2" :src="`${item.images[0]}`" alt="">
                        <div class="">
                            <div class="p-3">
                                <h4 class="font-bold text-black text-xl mb-2 line-clamp-1">{{ item.name }}
                                </h4>
                                <p class="font-medium text-red-500 mt-2">{{ formatInput(item.price) }}</p>
                                <p class="flex items-start text-black h-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
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
                        <div
                            class="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center">
                            <button @click="returnPost(item._id)"
                                class="detail-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">
                                Hoàn tác
                            </button>
                            <button @click="deleteItem(item._id)"
                                class="delete-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                                Xóa
                            </button>
                        </div>
                    </div>
                </nuxt-link>

            </div>
        </div>
        <div class="justify-center items-center flex mt-10 mb-10">
            <div class="">
                <button class="border px-3 py-2 mr-3 bg-cyan-300 hover:bg-cyan-600 rounded-sm" @click="prevPage"
                    :disabled="currentPage === 1">Previous</button>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <button class="border px-3 py-2 ml-3 bg-cyan-300 hover:bg-cyan-600 rounded-sm" @click="nextPage"
                    :disabled="currentPage === totalPages">Next</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { formatInput } from '../../../composables/convertPrice';
import { ref } from 'vue';
const response = ref()
const totalPages = ref('')
const currentPage = ref(1)
const posts = ref([])
const haveAPost = ref(true)

definePageMeta({
    layout: "custom",
});
// const { data: getAllPost } = await useFetch(`http://localhost:3001/api/item?page=${currentPage.value}`, {
//     method: "GET"
// })

const fetchData = async () => {
    const { data: getAllPost } = await useFetch('http://localhost:3001/api/admin/getPostDeleting/', {
        method: "GET"
    })
    if (!getAllPost.value) {
        haveAPost.value = false
    } else {
        console.log("🚀 ~ file: index.vue:73 ~ fetchData ~ getAllPost.value:", getAllPost.value)
        response.value = getAllPost.value
        console.log("🚀 ~ file: index.vue:75 ~ fetchData ~ response:", response)
        posts.value = response.value
    }

}
await fetchData()

console.log("🚀 ~ file: index.vue:83 ~ posts:", posts)
// if(haveAPost){
//     totalPages.value = response.value.totalPages
// }else{
//     totalPages.value = 0
// }
// const data = await fetchData()
// console.log(data);
// console.log(response.value.result);

// response.value = getAllPost.value.result
// totalPages.value = getAllPost.value.totalPages
// response.value = getAllPost.value

const nextPage = async () => {
    if (currentPage.value < totalPages.value) {
        console.log(currentPage);
        currentPage.value += 1;
        await fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
const prevPage = async () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
        await fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

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

const returnPost = async (itemID) => {
    console.log("🚀 ~ file: index.vue:153 ~ returnPost ~ console.log(itemID):", console.log(itemID))
    try {
        const response = await useFetch(`http://localhost:3001/api/admin/returnPost/${itemID}`, {
            method: "PUT"
        })
        console.log("🚀 ~ file: index.vue:160 ~ returnPost ~         console.log(response):", console.log(response))
        if (response.data.value.status === 200) {
            alert('Hoàn tác bài viết thành công');
            window.location.reload()
        }
        else {
            console.log("🚀 ~ file: index.vue:166 ~ returnPost ~ console.log('Lỗi'):", console.log('Lỗi'))
        }
    } catch (error) {
        console.log(error);
    }
}
</script>

<style lang="scss" scoped></style>