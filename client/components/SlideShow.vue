<template>
    <div class="mt-40 w-full">
        <Swiper class="mySwiper" :navigation="true" :modules="modules">
            <SwiperSlide v-for="image in slides" :key="image">
                <img :src="image" alt="" loading="lazy">
            </SwiperSlide>
        </Swiper>
    </div>
</template>
  
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'; // Thay vì 'swiper/css'
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { onMounted } from 'vue';

const modules = [Navigation];

const slides = [
    '/slides/1.jpg',
    '/slides/2.jpg',
    '/slides/3.jpg',
];

</script>
  
<style lang="scss" scoped></style>
  