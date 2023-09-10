// const jwt = require('jsonwebtoken')

// export default function ({store, route, redirect}){
//     // console.log(redirect);
//     const accessToken = localStorage.getItem('accessToken')

//     if(accessToken){
//         try {
//             const decodedToken = jwt.verify(accessToken, process.env.ACCESSTOKEN_SECRET_KEY);
//             const { role } = decodedToken;
//             console.log(role);
//             store.commit('SET_USER_ROLE', role);
//         } catch (error) {
//             console.error('Error authenticating token:', error);
//         }
//     }
//     if(route.name === 'admin' && store.state.role !== 'admin'){
//         redirect('/')
//     }
// }

export default defineNuxtRouteMiddleware((to, from) => {
    const role = localStorage.getItem('role')
    console.log(role);
    // console.log("🚀 ~ file: adminAuth.js:25 ~ defineNuxtRouteMiddleware ~ to:", to)
    if (to.path === '/admin' && role !== 'admin') {
        return navigateTo('/')
    }
    // return navigateTo('/admin')
})

// export default defineNuxtRouteMiddleware((to) => {
//     const { $config } = useNuxtApp()
//     if ($config) {
//         console.log('Accessed runtime config within middleware.')
//     }
//     console.log('Heading to', to.path, 'but I think we should go somewhere else...')
//     return '/secret'
// })
