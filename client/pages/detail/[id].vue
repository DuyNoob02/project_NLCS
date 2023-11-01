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
                    <p class="font-bold text-lg">Thông tin mô tả</p>
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
                        <!-- {{ googleMapUrl }} -->
                    </div>

                    <div>
                        <p class="font-bold mt-2 mb-5">Vị trí</p>
                        <div class="mapouter">
                            <div class="gmap_canvas">
                                <iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                                    :src="googleMapUrl.toString()"></iframe>
                                <a href="https://connectionsgame.org/">Connections Puzzle</a>

                            </div>
                        </div>
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

                    <div class="text-center mt-5 flex flex-col">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {{ userInfo.phoneNumber }}
                        </button>
                        <button @click="openChatBox()" class="ml-2 text-2xl mt-3 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-10 h-10  text-cyan-500 " >
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>

                        </button>
                    </div>
                </div>
            </div>


        </div>

    </div>
    <ChatBox v-if="showChatBox" :senderId="senderId" :recipientId="recipientId" :userName="userName" />
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
// console.log(id);

const { data: getPostInfo } = await useFetch(`http://localhost:3001/api/item/${id}`, {
    method: "GET"
})


const result = getPostInfo.value
// console.log(result.address);

const userID = result.userID
// console.log(userID + 'user id');
const { data: getUserInfo } = await useFetch(`http://localhost:3001/api/user/getInfoUser/${userID}`, {
    method: "GET",
})
// console.log(getUserInfo);
const userInfo = getUserInfo.value;
console.log(userInfo);

// const setImageUser = () => {
//     if (userInfo.image === 'default-img.png') {
//         return true;
//     }
//     return userInfo.image;
// }
const googleMapUrl = ref('')
const addLocation = () => {
    const location = result.address
    // console.log(location);
    googleMapUrl.value = `https://maps.google.com/maps?width=600&amp&height=400&amp&hl=en&amp&q=${location}&amp&t=&amp&z=14&amp&ie=UTF8&amp&iwloc=B&amp&output=embed`
}
addLocation()
const senderId = ref('');
const recipientId = ref('')
const userName = ref('')
senderId.value = localStorage.getItem('userID');
recipientId.value = userID
userName.value = userInfo.fullName
const showChatBox = ref(false)
const openChatBox = () => {
    showChatBox.value = !showChatBox.value

    console.log("🚀 ~ file: [id].vue:143 ~ openChatBox ~ console.log(showChatBox.value):", console.log(showChatBox.value))
}
</script>

<style scoped>
.mapouter {
    position: relative;
    text-align: right;
    width: 600px;
    height: 400px;
}

.gmap_canvas {
    overflow: hidden;
    background: none !important;
    width: 600px;
    height: 400px;
}

.gmap_iframe {
    width: 600px !important;
    height: 400px !important;
}
</style>