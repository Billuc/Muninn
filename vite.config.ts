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
    VitePWA({ registerType: "autoUpdate" }),
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
});
