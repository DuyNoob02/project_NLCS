// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path"
import { createI18n } from 'vue-i18n';
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
  plugins: [
    {
      src: '~/plugins/vue-i18n.js',
      mode: 'client' // Load only on the client side
    },
    // '~/plugins/socket.io.js'
  ],
    
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  
})
