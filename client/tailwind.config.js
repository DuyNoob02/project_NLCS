/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.js",
    'docs/content/**/*.md'
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'cover-img': "url('/public/cover.png')",
      // }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

