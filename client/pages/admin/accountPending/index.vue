<template>
    <div>
        <h2 class="text-lg uppercase font-medium text-cyan-400">Tài khoản chờ duyệt</h2>
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
                            <button @click="acceptUser(user._id, user.email, user.fullName)"
                                class="border mr-2 px-2 py-1 rounded-md bg-cyan-400 text-white hover:bg-cyan-200 hover:text-black ">
                                Duyệt
                            </button>
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
const { data: getListUser } = await useFetch('http://localhost:3001/api/admin/getAccount', { method: 'GET' })
// console.log("🚀 ~ file: index.vue:58 ~ console.log(getListUser.value):", console.log(getListUser))
console.log(getListUser.value.result);
ListUser.value = getListUser.value.result

const acceptUser = async (id, userEmail, userName) => {
    try {
        const result = await useFetch(`http://localhost:3001/api/admin/acceptUser/${id}`, {
            method: 'PUT'
        })
        console.log(result.data.value.result.accept);
        console.log(userEmail);
        const sendEmail = await useFetch('http://localhost:3001/api/admin/sendConfirmation', {
            body: {
                "email": userEmail,
                "username": userName
            },
            method: 'POST'
        })
        console.log(sendEmail.status.value);
        if (result.data.value.result.accept === true) {
            alert("Tài khoản đã được duyệt")
        }
        if (sendEmail.status.value === 'success') {
            alert("Đã gửi email xác nhận")
            window.location.reload()
        }

    } catch (error) {

    }
}


const deleteUser = async(id) => {
    try {
        alert('Xác nhận xóa')
        const response = await useFetch(`http://localhost:3001/api/admin/deleteUser/${id}`, {
            method: 'DELETE'
        })
        console.log(response.data.value.status);
        if(response.data.value.status === 200){
            alert('Xóa tài khoản thành công')
            location.reload()
        }
    } catch (error) {
        alert("Lỗi")
    }
}

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
</script>

<style lang="scss" scoped></style>