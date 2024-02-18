<script setup lang="ts">
import HomeEventCard from "@/components/home/HomeEventCard.vue";
import HomeFavoritesCard from "@/components/home/HomeFavoritesCard.vue";
import HomeTitle from "@/components/home/HomeTitle.vue";
</script>

<template>
  <HomeTitle />
  <div class="q-pt-md"><HomeEventCard /></div>
  <div class="q-pt-md"><HomeFavoritesCard /></div>
</template>
