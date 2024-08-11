import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import typescript from "@rollup/plugin-typescript";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    typescript(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      manifest: {
        name: "Muninn",
        short_name: "Muninn",
        description: "Muninn will remember it for you !",
        theme_color: "#e8e8e8",
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
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico,tff}"],
      },
    }),
    quasar({
      autoImportComponentCase: "pascal",
      sassVariables: "src/assets/quasar-variables.sass",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/Muninn",
});
