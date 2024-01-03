<script setup lang="ts">
import { setCssVar } from "quasar";
import { onMounted } from "vue";

onMounted(() => {
  setCssVar("background", "#e8e8e8");
  setCssVar("primary", "#947f57");
  setCssVar("secondary", "#3d3d3d");
  setCssVar("list-even", "#ffffff");
  setCssVar("list-odd", "#b9c2c4");
  setCssVar("list-neutral", "#e8e8e8");
});
</script>

<template>
  <div id="theme-component">
    <slot></slot>
  </div>
</template>

<style>
body,
.q-card {
  background-color: var(--q-background);
}
</style>
