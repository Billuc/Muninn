<template>
  <div :class="mergeClasses('bg-gradient-to-b from-base-100 to-base-300')">
    <VitePwaManifest />

    <NuxtLayout>
      <NavDrawer>
        <NuxtPage />
      </NavDrawer>
    </NuxtLayout>

    <PWAHandler />
  </div>
</template>

<script setup lang="ts">
import { themeChange } from "theme-change";
import PWAHandler from "@/components/layout/PWAHandler.vue";
import NavDrawer from "./components/layout/NavDrawer.vue";

useHead({
  titleTemplate(title) {
    return title ? `Muninn - ${title}` : "Muninn";
  },
  meta: [
    {
      name: "description",
      content: "Empty you head, Muninn will remember it for you",
    },
  ],

  link: [{ rel: "icon", type: "image/x-icon", href: "favicon.ico" }],
});

onMounted(() => themeChange(false));
</script>
