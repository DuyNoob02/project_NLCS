<template>
    <div class="grid grid-cols-4  gap-4 place-content-center max-w-7xl w-full mx-auto mt-40">
        <div class="col-span-1"></div>
        <div class="col-span-2">
            <form class="space-y-4 md:space-y-6 py-3 px-3" action="#">
                <h2 class="font-medium text-2xl border-b-2 border-slate-200 pb-2">Welcome to Alpha</h2>
                <div>
                    <div>
                        <label class="block mb-2  mt-3 text-sm font-medium text-gray-900 dark:text-white">
                            Tên tự án
                        </label>
                        <input type="text" name="name" id="name" v-model="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required="">
                    </div>
                    <div>
                        <label class="block mb-2  mt-3 text-sm font-medium text-gray-900 dark:text-white">
                            Hình thức
                        </label>
                        <div class="w-auto">
                            <input class="mr-2" type="radio" name="name" id="sell" v-model="formality" value="Bán" required="">
                            <label for="sell">Bán</label>
                            <input class="ml-5 mr-2" type="radio" name="name" id="rent" v-model="formality" value="Cho thuê" required="">
                            <label for="rent">Cho thuê</label>

                        </div>

                    </div>
                    <div>
                        <label class="block mb-2  mt-3 text-sm font-medium text-gray-900 dark:text-white">
                            Mã dự án
                        </label>
                        <input type="text" name="code" id="code" v-model="code"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required="">
                    </div>
                    <div>


                    </div>
                    <div>
                        <label class="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white">
                            Loại hình
                        </label>
                        <div class="relative inline-block w-full ">
                            <input type="text" name="type" id="type" v-model="type"
                                class="w-auto bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required>
                            <select v-model="selectedOption"
                                class="absolute top-0 h-full w-full px-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                <option class="px-5 " value="Đất nền">Đất nền</option>
                                <option class="px-5 " value="Căn hộ chung cư">Căn hộ chung cư</option>
                                <option class="px-5 " value="Căn hộ chung cư">Biệt thự</option>
                                <option class="px-5 " value="Nhà riêng">Nhà riêng</option>
                                <option class="px-5 " value="Nhà mặt phố">Nhà mặt phố</option>
                                <option class="px-5 " value="Khu nghỉ dưỡng">Khu nghỉ dưỡng</option>
                                <option class="px-5 " value="Nhà xưởng">Nhà xưởng</option>
                                <option class="px-5 " value="Condotel">Condotel</option>
                                <!-- Thêm các tùy chọn khác tại đây -->
                            </select>
                        </div>
                    </div>

                    <!-- <div>
                        <label class="block mb-2  mt-3 text-sm font-medium text-gray-900 dark:text-white">
                            Loại hình
                        </label>
                        <input type="text" name="type" id="type" v-model="type"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required="">
                    </div> -->
                    <div>
                        <label class="block mb-2   mt-3 text-sm font-medium text-gray-900 dark:text-white">
                            Địa chỉ
                        </label>
                        <input type="text" name="address" id="address" v-model="address"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required="">
                    </div>
                    <div>
                        <label class="block mb-2  mt-3 text-sm font-medium text-gray-900 dark:text-white">
                            Diện tích (m2)
                        </label>
                        <input type="text" name="acreage" id="acreage" v-model="acreage"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required="">
                    </div>
                    <div>
                        <label class="block mb-2  mt-3 text-sm font-medium text-gray-900 dark:text-white">
                            Phòng ngủ
                        </label>
                        <input type="number" name="bedrooms" id="bedrooms" v-model="bedrooms"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block max-w-xs p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required="">
                    </div>
                    <div>
                        <label class="block mb-2  mt-3 text-sm font-medium text-gray-900 dark:text-white">
                            Mức giá
                        </label>
                        <input type="text" name="price" id="price" :value="price" @input="handlePriceChange"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required="">

                    </div>
                    <div>
                        <label class="block mb-2  mt-3 text-sm font-medium text-gray-900 dark:text-white">
                            Thông tin mô tả
                        </label>
                        <textarea name="description" id="description" v-model="description" cols="70" rows="5">
                        </textarea>
                        <!-- <input type="text" name="description" id="description" v-model="description"
                            class="resize-y bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""> -->
                    </div>
                    <div>
                        <label class="block mb-2  mt-3 text-sm font-medium text-gray-900 dark:text-white">
                            Ảnh
                        </label>
                        <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" name="images"
                            multiple>
                        <img v-if="images.value" :src="images" alt="Selected Image">
                    </div>
                </div>
                <button type="button" @click="handleSubmit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Create
                </button>
            </form>
        </div>
        <div class="col-span-1"></div>

    </div>
    <div v-if="isLoading"
        class="h-screen bg-slate-200 fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center flex-col">
        <div class="m-12 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">

        </div>
        <span>Loading...</span>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { formatInput } from '../../composables/convertPrice'

// import { useI18n } from 'vue-i18n';
// const { t } = useI18n();
const router = useRouter()

const isLoading = ref(false)

const selectedOption = ref('');

const images = ref('');
const name = ref('')
const formality = ref('')
const code = ref('')
const type = ref('')
const address = ref('')
const acreage = ref('')
const bedrooms = ref('')
const price = ref('')
const description = ref('')
const createAt = Date.now()

// const formatInput = (input) => {
//     const numericValue = input.replace(/[^0-9]/g, '');
//     const formatter = new Intl.NumberFormat('vi-VN', {
//         style: 'currency',
//         currency: 'VND',
//     });
//     return formatter.format(Number(numericValue))
// }

const handlePriceChange = (e) => {
    const value = e.target.value;
    const rev = formatInput(value);
    price.value = rev;
}
console.log(price.value);
// formattedPrice = ref(formattedPrice || 0)

// function formatNumberWithCommas(number) {
//   // Remove non-numeric characters
//   const numericValue = parseFloat(number.replace(/[^\d.]/g, ''));

//   // Format the numeric value with commas
//   return numericValue.toLocaleString('vi-VN');
// }



const handleFileChange = (event) => {
    const file = event.target.files;
    console.log('this is change', file);
    images.value = file
    // if (file) {
    //     // Xử lý tệp được chọn ở đây
    //     // Ví dụ: bạn có thể sử dụng FileReader để đọc nội dung của tệp và gán vào biến selectedImage
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         images.value = reader.result;
    //     };
    //     reader.readAsDataURL(file);
    // }
};

watch(selectedOption, (newValue) => {
    type.value = newValue;
});

// const getAccessToken = async () => {
//     try {
//         const storedRefreshToken = localStorage.getItem('refreshToken');
//         console.log("RFtoken" + ' ' + storedRefreshToken);
//         if (storedRefreshToken) {
//             const response = await useFetch('http://localhost:3001/api/user/refresh-token', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ refreshToken: storedRefreshToken }),
//             });

//             const newAccessToken = response.data.newAccessToken;
//             const newRefreshToken = response.data.newRefreshToken;

//             localStorage.setItem('AccessToken', newAccessToken);
//             localStorage.setItem('refreshToken', newRefreshToken);
//             console.log(newAccessToken);
//             console.log(newRefreshToken);
//             return newAccessToken;
//         }
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }

// }
const handleSubmit = async () => {
    isLoading.value = true;
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('code', code.value);
    formData.append('formality', formality.value)
    formData.append('type', type.value);
    formData.append('address', address.value);
    formData.append('acreage', acreage.value);
    formData.append('bedrooms', bedrooms.value);
    // console.log(formattedPrice);
    formData.append('price', price.value);
    formData.append('description', description.value);
    formData.append('createAt', createAt)
    console.log(description);
    // Thêm các trường dữ liệu vào formData
    console.log('this is img', images.value.length);
    [...images.value].forEach((item) => {
        console.log("1");
        formData.append('images', item)
    })

    for (const pair of formData.entries()) {
        const [key, value] = pair;
        console.log(`Key: ${key}, Value: ${value}`);
    }
    console.log(formData);
    try {
        // const newAccessToken = await getAccessToken();
        // console.log(newAccessToken);
        const accessToken = localStorage.getItem('accessToken')
        console.log(accessToken);
        const response = await useFetch('http://localhost:3001/api/item/post/', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                // 'Content-Type': "multipart/form-data; boundary=xxx",
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData,

        });
        if (response.status === 'ok') {
            isLoading.value = false
        }
        console.log(response.data);
        router.push('/');
    } catch (error) {
        console.log(error);
    }
}



</script>

<style lang="scss" scoped></style>


