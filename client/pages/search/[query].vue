<template>
    <div class="mb-20">
        <h2 class="justify-center items-center flex mt-40 text-3xl font-medium">
            Kết quả cho tìm kiếm: {{ route.params.query }}
        </h2>
        <div class="grid grid-cols-4 gap-3 mt-20 max-w-7xl w-full mx-auto">
            <div class="" v-for="item in searchResult.value" :key="item._id">
                <nuxt-link  class=" " :to='`/detail/${item._id}`'>
                    <div  class="max-w-sm rounded overflow-hidden shadow-lg min-h-max h-full">
                        <img class="w-full h-60" :src='`${item.images[0]}`' alt="">
                        <div class="w-full image-cover rounded-t-md">
                            <div
                                class="px-2 pb-6 m-4 w-auto h-5 text-center bg-gray-700 rounded-full text-white float-right group-hover:opacity-25 justify-center items-center">
                                <!-- <span class="text-base tracking-wide  font-bold border-b border-white font-sans"> Loại</span> -->
                                <!-- <span class="text-xs  font-bold uppercase block font-sans">Cho thuê</span> -->
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

                    </div>
                </nuxt-link>

            </div>
        </div>
    </div>
</template>

<script setup>
import { formatInput } from '../../composables/convertPrice';
const route = useRoute()
console.log(route.query.option);
const searchQuery = route.params.query || ''
const selectedOption = route.query.option
const searchResult = ref([])
const { data: handleSearch } = await useFetch(`http://localhost:3001/api/item/search/query?name=${searchQuery}&option=${selectedOption}`, {
    method: 'GET'
})
console.log(handleSearch);

searchResult.value = handleSearch
// console.log(searchResult);
</script>

<style lang="scss" scoped></style>