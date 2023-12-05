<template>
    <div class="mt-20 mb-4 flex justify-center">
        <h1 class="text-3xl uppercase relative group">
            Các doanh nghiệp tiêu biểu
            <span
                class="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out duration-200"></span>
        </h1>

    </div>
    <div class="swiper-container-wrapper ">
        <swiper :slidesPerView="6" :grid="{
            rows: 1,
        }" :spaceBetween="10" :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
            :pagination="false" :modules="[Grid, Pagination, Navigation, Autoplay]" :autoplay="{ delay: 3000 }"
            observer="true" class="swiper">
            <swiper-button-next class="swiper-button-next "></swiper-button-next>
            <swiper-button-prev class="swiper-button-prev"></swiper-button-prev>

            <swiper-slide v-for="business in listBusiness" :key="business" class="relative h-6 group">
                <NuxtLink :to="business.link" class="swiper-slide" target="_blank">
                    <img class="border w-8 rounded-lg shadow-lg"
                        :src="`https://res.cloudinary.com/dytehhg2f/image/upload/v1700628282/${business.image}`" :alt="business.title" :title="business.title">
                </NuxtLink>
            </swiper-slide>
        </swiper>
    </div>
</template>
  
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Grid, Pagination, Autoplay, Navigation } from 'swiper/modules';


const { data: Business } = await useFetch(
    'http://localhost:3001/api/business/getBusiness',
    {
        method: 'GET'
    }
);

console.log(Business.value.result);
const listBusiness = Business.value.result;
</script>
  
<style  scoped>
.swiper-slide img {
    object-fit: contain;
    /* width: 500px; */
}


.swiper-container-wrapper {
    padding-bottom: 20px;
    /* position: relative; */
}

.swiper {
    width: 1100px;
    height: 100px;
    /* border: 1px solid color(srgb red green blue); */
    /* padding: 10px; */
    /* padding-left: 50px; */
}


.swiper-button-prev {
    /* left: 0; */
    padding-right: 30px;
}

.swiper-button-next {
    /* left: 0; */
    padding-left: 30px;
}

.swiper-button-prev:after,
.swiper-button-next:after {
    font-size: 20px;
    border: 1px solid;
    padding: 5px;
    background-color: aliceblue;
    right: 0;
    color: black;
    border-radius: 3px;

}



</style>
  