// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
 
  modules: [
    '@nuxt/eslint',
    'nuxt-tiptap-editor',
    '@nuxtjs/tailwindcss'
  ],
  // tailwindcss: {
  //   exposeConfig: true
  // },
css: [
  '~/assets/css/tailwind.css',
  '~/assets/css/tiptap.scss',

],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})