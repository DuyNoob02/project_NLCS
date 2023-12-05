<template>
    <div>
        <h2 class="text-lg uppercase font-medium text-cyan-400">Bài đăng chờ duyệt</h2>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Tên dự án
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Người đăng
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Thời gian
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody v-for="post in PostList" :key="PostList">
                    <tr v-if="!post.forDelete" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ post.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ post.userID.fullName }}
                        </td>
                        <td class="px-6 py-4">

                            {{ formatTimeAgo(post.createAt) }}
                        </td>
                        <td class="px-6 py-4">
                            <nuxt-link :to="`/admin/detailPendingPost/${post._id}`"
                                class="border mr-2 px-2 py-1 rounded-md bg-cyan-400 text-white hover:bg-cyan-200 hover:text-black ">
                                Xem chi tiết
                            </nuxt-link>
                            <button class="border px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 ">
                                Duyệt</button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "custom",
});

import { formatTimeAgo } from '../../../composables/formatTime'

const PostList = ref([])

const { data: getPostList } = await useFetch('http://localhost:3001/api/admin/getPostPending',{
    method: 'GET'
})
console.log(getPostList.value);
PostList.value = getPostList.value
// const getPostList = async () => {
//     try {
//         const result = await useFetch('http://localhost:3001/api/admin/getPostPending', {
//             method: 'GET'
//         })
//         console.log(result.data.value);
//         const data = result.data.value
//         PostList.value = result.data.value
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }
// PostList.value = getPostList()
</script>

<style lang="scss" scoped></style>