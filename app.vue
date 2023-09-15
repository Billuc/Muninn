<template>
  <div>
    <VitePwaManifest />

    <NuxtLayout>
      <NavBar />
      <Page>
        <NuxtPage />
      </Page>
    </NuxtLayout>

    <PWAHandler />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/layout/NavBar.vue";
import { themeChange } from "theme-change";
import PWAHandler from "@/components/layout/PWAHandler.vue";
import Page from "./components/layout/Page.vue";

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
