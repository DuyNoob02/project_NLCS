<template>
    <div>
      
        <div class="grid grid-cols-6 mt-10">
            <div class="col-span-5 mx-10">
                <div >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// definePageMeta({
//     middleware: 'admin-auth'
// })
// const router = useRouter()
// const route = useRoute()
// const role = localStorage.getItem('role');
// const stateAdmin = ref(false)
// const routeName = route.name;
// console.log(routeName);

// if(role !== 'admin' && routeName === 'admin'){
//     stateAdmin.value = false
//     // route.push('/')
//     navigateTo('/')
// }
// else{
//     stateAdmin.value = true
// }

import { ref } from 'vue';
import { formatTimeAgo } from '../../composables/formatTime'



definePageMeta({
    layout: "custom",
});

const adminName = localStorage.getItem('userName')


const selectedOption = ref('home');
const del = ref(false)
const ListUser = ref([]);
const PostList = ref([])
const username = ref('')
const showUserList = async () => {
    selectedOption.value = 'users';
    const userList = await fetchUserList();
    console.log(userList);
    ListUser.value = userList.map(user => ({ ...user, showDeleteButton: false }));
    console.log(ListUser);
}
const fetchUserList = async () => {
    const response = await useFetch('http://localhost:3001/api/user/', { method: 'GET' });
    const data = response.data.value.result
    // console.log(data);
    return data;
}

const showPostList = async () => {
    selectedOption.value = 'home';
    const postList = await getPostList()
    PostList.value = postList;
    console.log(PostList);
}

const getPostList = async () => {
    try {
        const result = await useFetch('http://localhost:3001/api/admin/getPostPending', {
            method: 'GET'
        })
        console.log(result.data.value);
        const data = result.data.value
        return data;
    } catch (error) {
        console.log(error);
    }

}

const showUserName = async (id) => {
    try {
        const response = await useFetch(`http://localhost:3001/api/user/getInfoUser/${id}`, {
            method: 'GET'
        })
        console.log(response.data.value._doc.fullName);
        const userName = response.data.value._doc.fullName
        username.value = userName
    } catch (error) {

    }
}
// showUserName('64f9c55ea4b1f6339811a9f0')
const deleteOption = () => {
    del.value = true
}

const deleteUser = async (userID, index) => {
    console.log(userID);
    try {
        const response = await useFetch(`http://localhost:3001/api/admin/deleteUser/${userID}`, {
            method: 'DELETE'
        })
        console.log(response.data.value);
        if (response.data.value.status === 200) {
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