<template>
  <div class="bg-base-200">
    <VitePwaManifest />

    <NuxtLayout>
      <NavBar />
      <div
        :class="
          mergeClasses(
            'pb-20',
            'md:pb-4',
            'pt-4',
            'md:pt-20',
            'mx-auto',
            'w-full',
            'min-h-screen',
            'md:w-2/3',
            'px-4',
            'bg-base-100'
          )
        "
      >
        <NuxtPage />
      </div>
    </NuxtLayout>

    <PWAHandler />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/layout/NavBar.vue";
import { themeChange } from "theme-change";
import PWAHandler from "@/components/layout/PWAHandler.vue";

useHead({
  titleTemplate(title) {
    return title ? `Muninn - ${title}` : "Muninn";
  },
  meta: [
    {
      name: "description",
      content: "Muninn - Empty you head, we'll remember it for you",
    },
  ],

  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

onMounted(() => themeChange(false));
</script>
