// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  spaLoadingTemplate: "./app/spa-loading-template.html",
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-lodash",
  ],
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  devServer: {
    https: {
      key: "./server.key",
      cert: "./server.crt",
    },
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});
