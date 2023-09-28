<template>
    <div class="grid grid-cols-5  gap-4 place-content-center max-w-7xl w-full mx-auto ">
        <div class="flex flex-row mt-40 gap-10 col-span-3">
            <div>
                <swiper class="mySwiper" :navigation="true" :modules="modules">
                    <swiper-slide v-for="image in result.images">
                        <img :src='`${image}`' alt="" loading="lazy">

                    </swiper-slide>
                </swiper>
                <p class="font-bold text-3xl mt-4">{{ result.formality }} {{ result.name }}</p>

                <div class="justify-around flex border-t-2 border-b-2 border-slate-200 py-5 mt-5">
                    <div class="flex flex-col text-center">
                        <b>Mức giá</b>
                        <p class="text-red-600 font-medium">{{ formatInput(result.price) }}</p>
                    </div>
                    <div class="flex flex-col text-center">
                        <b>Diện tích</b>
                        <p>{{ result.acreage }} m2</p>

                    </div>
                    <div class="flex flex-col text-center">
                        <b>Phòng ngủ</b>
                        <p>{{ result.bedrooms }}</p>
                    </div>

                </div>
                <div class="mt-5 mb-20">
                    <p class="font-bold">Thông tin mô tả</p>
                    <div class="">
                        <p class="font-medium mt-2">
                        <p class="font-bold">Loại hình:</p>
                        {{ result.type }}
                        </p>
                        <p class="mt-2">
                        <p class="font-bold"> Địa chỉ:</p> {{ result.address }}</p>
                        <p class="font-bold mt-2">Tiện nghi & Mô tả:</p>
                        <p>{{ result.amenities }}</p>
                        <p>{{ result.description }}</p>
                    </div>

                </div>

            </div>
            <!-- <div class="">{{ userInfo.fullName }}</div>
                <div class="">{{ userInfo.phoneNumber }}</div> -->
        </div>
        <div class="flex flex-row mt-40 gap-10 col-span-2">
            <div class="grid grid-cols-3 w-80 mx-auto" v-if="userInfo">
                <div class="col-span-2">
                    <img v-if="userInfo.image" class="rounded-full " :src='`${userInfo.image}`' alt="">
                    <!-- <img v-else :src="`http://localhost:3001/uploads`" alt=""> -->
                    <nuxt-link :to="`/profile/${userID}`">
                        <div class="mt-5  text-center">
                            <h2 class=" font-hairline text-xl">Được đăng bởi</h2>
                            <p class="text-2xl font-medium">
                                {{ userInfo.fullName }}
                            </p>
                        </div>
                    </nuxt-link>

                    <div class="text-center mt-5">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {{ userInfo.phoneNumber }}
                        </button>
                    </div>
                </div>
            </div>

                
        </div>

    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import '../../assets/style.css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
const modules = [Navigation];
import { formatInput } from '../../composables/convertPrice'
const route = useRoute()

const id = route.params.id
console.log(id);

const { data: getPostInfo } = await useFetch(`http://localhost:3001/api/item/${id}`, {
    method: "GET"
})


const result = getPostInfo.value
console.log(result);

const userID = result.userID
console.log(userID + 'user id');
const { data: getUserInfo } = await useFetch(`http://localhost:3001/api/user/getInfoUser/${userID}`, {
    method: "GET",
})
// console.log(getUserInfo);
const userInfo = getUserInfo.value._doc;
// console.log(userInfo.image);

// const setImageUser = () => {
//     if (userInfo.image === 'default-img.png') {
//         return true;
//     }
//     return userInfo.image;
// }
</script>

<style lang="scss" scoped></style>