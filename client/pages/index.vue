<template>

    <!-- <div class="mt-40">
        <swiper class="mySwiper" :navigation="true" :modules="modules">
            <swiper-slide v-for="image in slides">
                <img :src='`${image}`' alt="" loading="lazy">

            </swiper-slide>
        </swiper>
    </div> -->
    
    <SlideShow class="mt-40" />
    <div class="mt-20 flex justify-center">
        <h1 class="text-3xl uppercase relative group">
            Bài đăng mới gần đây
            <span
                class="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out duration-200"></span>
        </h1>
    </div>
    <div class="grid grid-cols-4 gap-3 mt-20 max-w-7xl w-full mx-auto">
        <div class="" v-for="item in response" :key="item._id">
            <nuxt-link v-if="!item.pending" class=" " :to='`/detail/${item._id}`'>
                <div class="max-w-sm rounded overflow-hidden shadow-lg min-h-max h-full">
                    <img class="w-full h-60" :src='`${item.images[0]}`' alt="">
                    <div class="w-full image-cover rounded-t-md">
                        <div
                            class="p-2 m-4 w-16 h-16 text-center bg-gray-700 rounded-full text-white float-right group-hover:opacity-25 justify-center items-center">
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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
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
    <div class="mb-20"></div>
</template>

<script setup  lang="ts">
// import { Swiper, SwiperSlide } from 'swiper/vue';
// import 'swiper/css';
// import '../assets/style.css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// const modules = [Navigation];
import { formatInput } from '../composables/convertPrice';

// const slides = [
//     '/slides/1.jpg',
//     'slides/2.jpg',
//     'slides/3.jpg',

// ]


export interface Root {
    result: Result[]
}
interface Result {
    _id: string;
    code: string;
    name: string;
    userID: string;
    address: string;
    acreage: string;
    amenities?: string;
    price: string;
    bedrooms: number;
    type: string;
    formality: string,
    description: string;
    images: string[];
    pending: Boolean;
    __v: number
}




const { data } = await useFetch<
    Root
>("http://localhost:3001/api/item", {
    method: "GET"

})

const response = (data.value?.result) as Result[]
// console.log(response);


</script>

<style  scoped>
.content {
    margin-top: 150px;
}
</style>