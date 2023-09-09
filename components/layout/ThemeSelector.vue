<template>
  <select data-choose-theme data-key="theme" class="select bg-base-200 focus:outline-0">
    <option v-for="theme in themes" :value="theme">
      {{ _.capitalize(theme) }}
    </option>
  </select>
</template>

<script setup lang="ts">
import _ from "lodash";
import { themeChange } from "theme-change";

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
