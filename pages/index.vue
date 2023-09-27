<template>
  <div>
    <PageHeading><span>Hello</span></PageHeading>

    <HomeVue />
  </div>
</template>

<script setup lang="ts">
import HomeVue from "~/components/home/HomeVue.vue";
import PageHeading from "~/components/layout/PageHeading.vue";

useHead({
  title: "Home",
});
</script>
