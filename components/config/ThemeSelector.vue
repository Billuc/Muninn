<template>
  <div
    :class="
      mergeClasses(
        'grid',
        'grid-cols-2',
        'sm:grid-cols-3',
        'md:grid-cols-4',
        'lg:grid-cols-5',
        'gap-4',
        'pl-4'
      )
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
  "valentine",
  "cupcake",
];

onMounted(() => themeChange(false));
</script>
