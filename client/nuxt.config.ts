// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path"
// import { createI18n } from 'vue-i18n';
// import { library, config } from '@fortawesome/fontawesome-svg-core'
export default defineNuxtConfig({
  ssr: false,
//   modules: [
//     // ...
//     '@tailvue/nuxt',
// ],
  alias: {
    "@": resolve(__dirname, "/"),
  },
  css: [
    "~/assets/main.scss",
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  // plugins: [
  //   {  mode: 'client' }
  //   // '~/plugins/socket.io.js'
  // ],
    
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  
})