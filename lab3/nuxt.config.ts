import { resolve } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: [
    '@/assets/style/global.css'
  ],
  devtools: { enabled: true },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Assuming 'src' is your source directory
    },
  },
})
