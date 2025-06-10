<template>
    <div class="flex justify-center items-center">
        <form class=" w-auto h-auto  py-5 px-40">
            <div class="flex relative">
                <!-- <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your
                    Email</label>
                <button id="dropdown-button" data-dropdown-toggle="dropdown" @click="toggleDropdownSearch"
                    class="relative w-28 flex-shrink-0 z-10 inline-flex justify-center  items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    type="button">
                    {{ selectedOption }}
                    <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 4 4 4-4" />
                    </svg>
                </button> -->
                <!-- <div id="dropdown" v-if="dropdownSearch"
                    class="absolute  z-10  top-10 bg-slate-300  divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 invisible">
                    <ul class="py-auto text-sm text-gray-700 dark:text-gray-200 absolute " aria-labelledby="dropdown-button">
                        
                        <li>
                            <button type="button" @click="selectOption('Bán')"
                                class="inline-flex w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Bán</button>
                        </li>
                        <li>
                            <button type="button" @click="selectOption('Cho thuê')"
                                class="inline-flex w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cho
                                thuê</button>
                        </li>

                    </ul>
                </div> -->
                <div class="relative w-full">
                    <input type="search" v-model="searchQuery" @change="handleInputChange"
                        class="block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg  border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Chung cư, Nhà ở, Đất nền..." required>
                    <button type="button" @click="handleSubmit"
                        class="absolute top-0 right-0 py-2.5 px-5 text-sm font-medium h-auto text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                </div>
            </div>
            <div class="flex mt-1 " @change="handleSelectChange">
                <div class="">
                    <select v-model="selectedFormality" class="rounded-md text-sm">
                        <option value="" disabled selected>Chọn hình thức</option>
                        <option value="Bán">Bán</option>
                        <option value="Cho thuê">Cho Thuê</option>
                    </select>
                </div>
                <div class="ml-2">
                    <select v-model="selectedType" class="rounded-md text-sm">
                        <option value="" disabled selected>Chọn loại hình</option>
                        <option class="px-5 " value="Đất nền">Đất nền</option>
                        <option class="px-5 " value="Căn hộ chung cư">Căn hộ chung cư</option>
                        <option class="px-5 " value="Căn hộ chung cư">Biệt thự</option>
                        <option class="px-5 " value="Nhà riêng">Nhà riêng</option>
                        <option class="px-5 " value="Nhà mặt phố">Nhà mặt phố</option>
                        <option class="px-5 " value="Khu nghỉ dưỡng">Khu nghỉ dưỡng</option>
                        <option class="px-5 " value="Nhà xưởng">Nhà xưởng</option>
                        <option class="px-5 " value="Condotel">Condotel</option>
                    </select>
                </div>
                <div class="ml-2">
                    <!-- <label for="tinh">Chon tinh</label> -->
                    <select v-model="selectedTinh" @change="updateHuyens" class="rounded-md text-sm">
                        <option value="" disabled selected>Chọn Tỉnh Thành</option>
                        <option v-for="(tinh, index) in tinhs" :key="index" :value="tinh.code">
                            {{ tinh.name }}
                        </option>
                    </select>
                </div>
                <div class="ml-2">
                    <!-- <label for="huyen">Chọn quận/huyện:</label> -->
                    <select v-model="selectedHuyen" class="rounded-md text-sm">
                        <option value="" disabled selected>Chọn Quận Huyện</option>
                        <option v-for="(huyen, index) in huyens" :key="index" :value="huyen.name">
                            {{ huyen.name }}
                        </option>
                    </select>
                </div>

            </div>

        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const route = useRouter();

const searchQuery = ref('');
const selectedFormality = ref('');
const selectedType = ref('');
const selectedTinh = ref('');
const selectedHuyen = ref('');
const tinhs = ref([]);
const huyens = ref([]);
const query = ref('');

const handleInputChange = () => {
    query.value = searchQuery.value;
};

const handleSelectChange = () => {
    let ProvinceName = '';
    let HuyenName = selectedHuyen.value;

    for (let i = 0; i < tinhs.value.length; i++) {
        const tinh = tinhs.value[i];
        if (selectedTinh.value == tinh.code) {
            ProvinceName = tinh.name;
            break;
        }
    }

    query.value = `${selectedFormality.value}-${selectedType.value}-${ProvinceName}-${HuyenName}`;
};

const handleSubmit = async () => {
    if (!query.value) {
        alert("Cần nhập thông tin tìm kiếm!");
    } else {
        route.push(`/search/${query.value}`);
    }
};

const updateHuyens = () => {
    const selectedProvince = tinhs.value.find(tinh => tinh.code == selectedTinh.value);
    huyens.value = selectedProvince?.districts || [];
};

// 🔄 Gọi API mới để lấy tỉnh + quận/huyện (depth=2)
const { data: ProvinceData } = await useFetch('https://provinces.open-api.vn/api/?depth=2', {
    method: 'GET'
});

tinhs.value = ProvinceData.value;
</script>


<style lang="scss" scoped></style>