// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2025-03-18',

  modules: [
    '@pinia/nuxt',
  ],

  devServer: {
    port: 3001
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001'
    }
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        prependPath: true,
      }
    }
  }
})