<template>
  <div>
    <PageHeading>Configuration</PageHeading>

    <ThemeSelector />
  </div>
</template>

<script setup lang="ts">
import ThemeSelector from "@/components/config/ThemeSelector.vue";
import PageHeading from "~/components/layout/PageHeading.vue";

useHead({
  title: "Configuration",
});
</script>
