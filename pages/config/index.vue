<template>
  <div class="prose mx-auto">
    <h1 class="text-center">Configuration</h1>

    <ThemeSelector />
  </div>
</template>

<script setup lang="ts">
import ThemeSelector from "@/components/config/ThemeSelector.vue";

useHead({
  title: "Configuration",
});
</script>
