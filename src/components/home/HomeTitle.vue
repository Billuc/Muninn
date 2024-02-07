<script setup lang="ts">
import { format } from "date-fns";

const date = new Date();
</script>

<template>
  <div class="home-title">
    <div class="text-h2 q-mb-md">Hello ! It's</div>
    <div>
      <span class="text-h3 text-italic">{{ format(date, "E, ") }}</span>
      <span class="text-h3 text-weight-bold">{{ format(date, "do ") }}</span>
      <span class="text-h4 text-uppercase">{{ format(date, "MMM.") }}</span>
    </div>
  </div>
</template>

<style>
.home-title {
  text-align: center;
  padding: 5rem 0;
}
</style>
