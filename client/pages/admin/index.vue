<template>
    <div>
        <header class="flex items-center justify-between border-b-2  drop-shadow-lg">
            <h1 class="ml-20 text-3xl font-medium uppercase  py-5">Alpha Admin</h1>
            <div class="mr-20">
                <p class="border p-3 rounded-md hover:bg-slate-300 hover:text-slate-50 cursor-pointer">{{ adminName }}</p>
            </div>
        </header>

        <div class="grid grid-cols-6 mt-10">
            <div class="cols-span-1 border-r-2">
                <ul>
                    <li class="py-3 pl-5 group hover:bg-slate-600 hover:text-white cursor-pointer" @click="homepage">
                        Trang chính
                    </li>
                </ul>
                <ul>
                    <li class="py-3 pl-5 group hover:bg-slate-600 hover:text-white cursor-pointer" @click="showUserList">
                        Người dùng
                    </li>
                </ul>
                <ul>
                    <li class="py-3 pl-5 group hover:bg-slate-600 hover:text-white cursor-pointer">
                        etc
                    </li>
                </ul>

            </div>
            <div class="col-span-5 mx-10">
                <div v-if="selectedOption === 'home'">
                    <h2 class="text-lg uppercase font-medium text-cyan-400">Bài đăng chờ duyệt</h2>
                </div>


                <div v-if="selectedOption === 'users'">
                    <h2 class="text-lg uppercase font-medium text-cyan-400">danh sách người dùng</h2>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Tên người dùng
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Số điện thoại
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-for="user in ListUser" :key="ListUser">
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ user.fullName }}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{ user.email }}
                                    </td>
                                    <td class="px-6 py-4">
                                        {{ user.phoneNumber }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <button class="border mr-2 px-2 py-1 rounded-md bg-cyan-400 text-white hover:bg-cyan-200 hover:text-black ">Sửa</button>
                                        <button v-if="!user.showDeleteButton" class="border px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 " @click="user.showDeleteButton = true">Xóa</button>
                                        <button v-else class="border px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 " @click="deleteUser(user._id)">Xác nhận</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
definePageMeta({
    layout: "custom",
});

const adminName = localStorage.getItem('userName')


const selectedOption = ref('home');
const del = ref(false)
const ListUser = ref([]);

const showUserList = async () => {
    selectedOption.value = 'users';
    const userList = await fetchUserList();
    console.log(userList);
    ListUser.value = userList.map(user => ({ ...user, showDeleteButton: false}));
    console.log(ListUser);
}

const homepage = () => {
    selectedOption.value = 'home'
}

const fetchUserList = async () => {
    const response = await useFetch('http://localhost:3001/api/user/', { method: 'GET' });
    const data = response.data.value.result
    // console.log(data);
    return data;
}

const deleteOption = () => {
    del.value = true
}

const deleteUser = async (userID, index) => {
    console.log(userID);
    try {
        const response = await useFetch(`http://localhost:3001/api/user/deleteUser/${userID}`, {
            method: 'DELETE'
        })
        console.log(response.data.value);
        if(response.data.value.status === 200){
            alert('Xóa thành công')
            await showUserList()
            ListUser.value[index].showDeleteButton = false
        }
    } catch (error) {
        console.log(error);
    }
}
</script>

<style lang="scss" scoped></style>