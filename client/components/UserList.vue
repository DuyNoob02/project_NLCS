<template>
    <div v-for="user in ListUser " :key="user._id">
        {{ user.fullName }}
    </div>
</template>

<script setup>

const {data: getListUser} = useFetch('http://localhost:3001/api/user/', {
    method: 'GET'
})

const ListUser = getListUser

</script>

<style  scoped>

</style>