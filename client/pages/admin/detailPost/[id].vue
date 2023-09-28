<template>
    <div v-if="Post.forDelete != true">

        <div class="flex items-center justify-center mt-10">
            <!-- {{ Post.id }} -->
            <button @click="deletePost(Post._id)"
                class="border px-5 py-3 mr-5 bg-red-500 text-white hover:bg-red-500 hover:text-slate-500">Xóa</button>
        </div>

        <div class="grid grid-cols-5  gap-4 place-content-center max-w-7xl w-full mx-auto ">
            <div class="flex flex-row mt-10 gap-10 col-span-3">
                <div>
                    <swiper class="mySwiper" :navigation="true" :modules="modules">
                        <swiper-slide v-for="image in Post.images">
                            <img :src='`${image}`' alt="" loading="lazy">

                        </swiper-slide>
                    </swiper>
                    <p class="font-bold text-3xl mt-4">{{ Post.formality }} {{ Post.name }}</p>

                    <div class="justify-around flex border-t-2 border-b-2 border-slate-200 py-5 mt-5">
                        <div class="flex flex-col text-center">
                            <b>Mức giá</b>
                            <p class="text-red-600 font-medium">{{ formatInput(Post.price) }}</p>
                        </div>
                        <div class="flex flex-col text-center">
                            <b>Diện tích</b>
                            <p>{{ Post.acreage }} m2</p>

                        </div>
                        <div class="flex flex-col text-center">
                            <b>Phòng ngủ</b>
                            <p>{{ Post.bedrooms }}</p>
                        </div>

                    </div>
                    <div class="mt-5 mb-20">
                        <p class="font-bold">Thông tin mô tả</p>
                        <div class="">
                            <p class="font-medium mt-2">
                            <p class="font-bold">Loại hình:</p>
                            {{ Post.type }}
                            </p>
                            <p class="mt-2">
                            <p class="font-bold"> Địa chỉ:</p> {{ Post.address }}</p>
                            <p class="font-bold mt-2">Tiện nghi & Mô tả:</p>
                            <p>{{ Post.amenities }}</p>
                            <p>{{ Post.description }}</p>
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

    </div>
</template>

<script setup>
const route = useRoute()
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import '../../../assets/style.css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
const modules = [Navigation];
import { formatInput } from '../../../composables/convertPrice';
definePageMeta({
    layout: "custom",
});
const postId = route.params.id
// console.log(postId);
const { data: getPost } = await useFetch(`http://localhost:3001/api/item/${postId}`, {
    method: 'GET'
})

const Post = getPost
console.log(Post);


const userID = Post.value.userID
// console.log(':::userId', userID);
const { data: getUserInfo } = await useFetch(`http://localhost:3001/api/user/getInfoUser/${userID}`, {
    method: "GET",
})
// console.log(getUserInfo);
const userInfo = getUserInfo.value._doc;
// console.log(userInfo);


const deletePost = async (id) => {

    try {
        alert('Xác nhận xóa')
        const response = await useFetch(`http://localhost:3001/api/admin/markForDelete/${id}`, {
            method: 'PUT'
        })
        console.log(response);
        if (response.data.value.status === 200) {
            alert('Xóa bài viết thành công');
            navigateTo('/admin')
        }
        else {
            console.log('Lỗi');
        }
    } catch (error) {
        console.log(error.message);
    }


}

const acceptPost = async (id) => {
    try {
        const result = await useFetch(`http://localhost:3001/api/admin/changeState/${id}`, {
            method: 'PUT'
        })
        console.log(result);
        if (result.data.value.status === 200) {
            alert('Bài đăng đã được duyệt')
            navigateTo('/admin/pendingPost')
        }
    } catch (error) {
        console.log('Lỗi', error.message);
    }
}
</script>

<style  scoped></style>