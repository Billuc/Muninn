<template>
  <div>
    <PageHeading><span>Lists</span></PageHeading>

    <ListGrid />
  </div>
</template>

<script setup lang="ts">
import PageHeading from "~/components/layout/PageHeading.vue";
import ListGrid from "~/components/lists/ListGrid.vue";

useHead({
  title: "Lists",
});
</script>
