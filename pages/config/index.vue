<template>
  <div>
    <LayoutPageHeading>Configuration</LayoutPageHeading>
    <LayoutBackground :icon="faCog" />

    <ConfigPage />
  </div>
</template>

<script setup lang="ts">
import { faCog } from "@fortawesome/free-solid-svg-icons";

useHead({
  title: "Configuration",
});
</script>
