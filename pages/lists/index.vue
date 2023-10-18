<template>
  <div>
    <PageHeading><span>Lists</span></PageHeading>
    <Background :icon="faCheckSquare" />

    <ListGrid />
  </div>
</template>

<script setup lang="ts">
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import Background from "~/components/layout/Background.vue";
import PageHeading from "~/components/layout/PageHeading.vue";
import ListGrid from "~/components/lists/ListGrid.vue";

useHead({
  title: "Lists",
});
</script>
