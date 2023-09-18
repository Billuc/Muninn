<template>
  <div
    :class="
      mergeClasses('grid', 'grid-cols-2', 'md:grid-cols-3', 'gap-2', 'pl-4')
    "
  >
    <ThemeDisplay
      v-for="theme in themes"
      :theme-name="theme"
      :key="'select-' + theme"
    />
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { themeChange } from "theme-change";
import ThemeDisplay from "./ThemeDisplay.vue";

const themes = [
  "light",
  "dark",
  "synthwave",
  "pastel",
  "retro",
  "cyberpunk",
  "valentine",
  "cupcake",
];

onMounted(() => themeChange(false));
</script>
