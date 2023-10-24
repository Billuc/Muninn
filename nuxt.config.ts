// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  spaLoadingTemplate: "./app/spa-loading-template.html",
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-lodash",
    "@vite-pwa/nuxt",
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
        interval: 2000,
      },
    },
  },
  app: {
    baseURL: "/Muninn/",
  },
  pwa: {
    registerType: "prompt",
    manifest: {
      name: "Muninn",
      short_name: "Muninn",
      theme_color: "#333333",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
  },
  nitro: {
    prerender: {
      routes: ["/"],
    },
  },
});
