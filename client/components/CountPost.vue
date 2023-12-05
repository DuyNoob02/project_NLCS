<template>
    <div>
        <div class="mt-20 mb-4 flex justify-center">
            <h1 class="text-3xl uppercase relative group">
                Bất động sản theo địa điểm
                <span
                    class="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out duration-200"></span>
            </h1>

        </div>

        <div class="grid grid-cols-8">
            <!-- Cột trái -->
            <div class="col-start-2 col-span-3 relative m-2 cursor-pointer">
                <NuxtLink :to='`/PostByAddress/${location[0]}`'>
                    <swiper class="swp-img rounded-md" :modules="modules" :autoplay="{ delay: 2000 }">
                        <swiper-slide v-for="image in HCMimg">
                            <img :src='`${image}`' alt="" loading="lazy">
                        </swiper-slide>
                    </swiper>
                    <!-- Ghi chú -->
                    <div class="absolute top-0 left-0 text-sm font-medium text-white mt-2 ml-10 opacity-75 z-10">
                        TP. Hồ Chí Minh
                        <p>{{ HCMPost }} tin đăng</p>
                    </div>
                </NuxtLink>


            </div>
            <!-- Cột phải -->
            <div class="col-start-5 col-span-3 grid grid-cols-2 grid-rows-2 ">
                <!-- Hàng 1 -->
                <div class="row-span-1 col-span-1 m-2 relative cursor-pointer">
                    <NuxtLink :to='`/PostByAddress/${location[1]}`'>
                        <swiper class="small-swp rounded-md" :modules="modules" :autoplay="{ delay: 2000 }">
                            <swiper-slide v-for="image in DNimg">
                                <img class="" :src='`${image}`' alt="" loading="lazy">
                            </swiper-slide>
                        </swiper>
                        <!-- Ghi chú -->
                        <div class="text-sm font-medium absolute top-0 left-0 text-white mt-2 ml-5 opacity-75 z-10">
                            Đà Nẵng
                            <p>{{ DNPost }} tin đăng</p>
                        </div>
                    </NuxtLink>


                </div>
                <div class="row-span-1 col-span-1 ">
                    <div class="row-span-1 col-span-1 m-2 relative cursor-pointer">
                        <NuxtLink :to='`/PostByAddress/${location[2]}`'>
                            <swiper class="small-swp rounded-md" :modules="modules" :autoplay="{ delay: 2000 }">
                                <swiper-slide v-for="image in CTimg">
                                    <img class="" :src='`${image}`' alt="" loading="lazy">
                                </swiper-slide>
                            </swiper>
                            <!-- Ghi chú -->
                            <div class="text-sm font-medium absolute top-0 left-0 text-white mt-2 ml-5 opacity-75 z-10">
                                Cần Thơ
                                <p>{{ CanThoPost }} tin đăng</p>
                            </div>
                        </NuxtLink>

                    </div>
                </div>

                <!-- Hàng 2 -->
                <div class="row-span-1 col-span-1 ">
                    <div class="row-span-1 col-span-1 ml-2 mr-2 mb-2 relative cursor-pointer">
                        <NuxtLink :to='`/PostByAddress/${location[3]}`'>
                            <swiper class="small-swp rounded-md" :modules="modules" :autoplay="{ delay: 2000 }">
                                <swiper-slide v-for="image in HNimg">
                                    <img class="" :src='`${image}`' alt="" loading="lazy">
                                </swiper-slide>
                            </swiper>
                            <!-- Ghi chú -->
                            <div class="absolute text-sm font-medium top-0 left-0 text-white mt-2 ml-5 opacity-75 z-10">
                                Hà Nội
                                <p>{{ HNPost }} tin đăng</p>
                            </div>
                        </NuxtLink>

                    </div>
                </div>
                <div class="row-span-1 col-span-1 ">
                    <!-- <div class="row-span-1 col-span-1 ">
                        
                    </div> -->
                    <div class="row-span-1 col-span-1 ml-2 mr-2 mb-2 relative cursor-pointer">
                        <NuxtLink :to='`/PostByAddress/${location[4]}`'>
                            <swiper class="small-swp rounded-md" :modules="modules" :autoplay="{ delay: 2000 }">
                                <swiper-slide v-for="image in BDimg">
                                    <img class="" :src='`${image}`' alt="" loading="lazy">
                                </swiper-slide>
                            </swiper>
                            <div class="absolute text-sm font-medium top-0 left-0 text-white mt-2 ml-5 opacity-75 z-10">
                                Bình Dương
                                <p>{{ BDPost }} tin đăng</p>
                            </div>
                        </NuxtLink>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'
// import '../assets/style.css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
const modules = [Navigation, Autoplay];

// onMounted(() => {
//     const mySwiper = new Swiper('.swp-img', {
//         autoplay: {
//             delay: 3000,
//         },
//         // Add other Swiper options here as needed
//     });
// })

const location = [
    'TP.HCM',
    'Đà Nẵng',
    'Cần Thơ',
    'Hà Nội',
    'Bình Dương'
]


const { data: getCanThoPost } = await useFetch(`http://localhost:3001/api/item/count/countByAddress?address=Cần Thơ`)
// console.log(getCanThoPost.value.count);
const CanThoPost = getCanThoPost.value.count


const { data: getHCMPost } = await useFetch(`http://localhost:3001/api/item/count/countByAddress?address=TP.HCM`)
// console.log(getHCMPost.value.count);
const HCMPost = getHCMPost.value.count


const { data: getHNPost } = await useFetch(`http://localhost:3001/api/item/count/countByAddress?address=Hà Nội`)
// console.log(getHNPost.value.count);
const HNPost = getHNPost.value.count


const { data: getDNPost } = await useFetch(`http://localhost:3001/api/item/count/countByAddress?address=Đà Nẵng`)
// console.log(getDNPost.value.count);
const DNPost = getDNPost.value.count


const { data: getBDPost } = await useFetch(`http://localhost:3001/api/item/count/countByAddress?address=Bình Dương`)
// console.log(getBDPost.value.count);
const BDPost = getBDPost.value.count


const HCMimg = {
    1: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698759042/Slide_image/HCM-web-1_fnnxt1.jpg',
    2: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698759041/Slide_image/HCM-web-3_sonhwu.jpg',
    3: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698759041/Slide_image/HCM-web-2_iqlf1t.jpg'
}
const CTimg = {
    1: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698811123/Slide_image/CT_ohtx3m.jpg',
    2: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698811123/Slide_image/CT3_qlyzjh.jpg',
    3: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698811121/Slide_image/CT2_kvsea7.jpg'
}
const HNimg = {
    1: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698759042/Slide_image/HN-web-1_zifboy.jpg',
    2: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698759041/Slide_image/HN-web-2_h39rvx.jpg',
    3: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698759040/Slide_image/HN-web-3_z4enhf.jpg'
}
const DNimg = {
    1: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698759041/Slide_image/DDN-web-3_w8qckh.jpg',
    2: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698759041/Slide_image/DDN-web-2_ozvavy.jpg',
    3: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698759040/Slide_image/DDN-web-1_tzirok.jpg'
}

const BDimg = {
    1: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698759040/Slide_image/BD-web-1_cazott.jpg',
    2: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698759040/Slide_image/BD-web-2_ohohjt.jpg',
    3: 'https://res.cloudinary.com/dytehhg2f/image/upload/v1698818856/Slide_image/BD_qftuup.jpg'
}



</script>

<style  scoped>
.swp-img {
    width: 640px;
    height: 388px;
}

.small-swp {
    width: 340px;
    height: 190px;
}
</style>