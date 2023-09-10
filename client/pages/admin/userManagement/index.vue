<template>
    <div>
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
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ user.fullName }}
                        </th>
                        <td class="px-6 py-4">
                            {{ user.email }}
                        </td>
                        <td class="px-6 py-4">
                            {{ user.phoneNumber }}
                        </td>
                        <td class="px-6 py-4">
                            <button
                                class="border mr-2 px-2 py-1 rounded-md bg-cyan-400 text-white hover:bg-cyan-200 hover:text-black ">Sửa</button>
                            <button v-if="!user.showDeleteButton"
                                class="border px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 "
                                @click="user.showDeleteButton = true">Xóa</button>
                            <button v-else class="border px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 "
                                @click="deleteUser(user._id)">Xác nhận</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    layout: "custom",
});

const ListUser = ref([])
const { data: getListUser } = await useFetch('http://localhost:3001/api/user/', { method: 'GET' })
console.log(getListUser.value.result);
ListUser.value = getListUser.value.result



const deleteUser = async (userID, index) => {
    console.log(userID);
    try {
        const response = await useFetch(`http://localhost:3001/api/admin/deleteUser/${userID}`, {
            method: 'DELETE'
        })
        console.log(response.data.value);
        if (response.data.value.status === 200) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userID')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('userName')
            localStorage.removeItem('role')
            alert('Xóa thành công')
            window.location.reload()
            ListUser.value[index].showDeleteButton = false
        }
    } catch (error) {
        console.log(error);
    }
}
</script>

<style  scoped>

</style>