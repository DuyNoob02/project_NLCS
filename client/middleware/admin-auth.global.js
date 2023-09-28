
export default defineNuxtRouteMiddleware((to, from) => {
    const role = localStorage.getItem('role')
    // console.log(role);
    // console.log("🚀 ~ file: adminAuth.js:25 ~ defineNuxtRouteMiddleware ~ to:", to)
    if (to.path === '/admin' && role !== 'admin') {
        return navigateTo('/')
    }
    
})


