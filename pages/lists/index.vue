<template>
  <div>
    <LayoutPageHeading><span>Lists</span></LayoutPageHeading>
    <LayoutBackground :icon="faCheckSquare" />

    <ListsListGrid />
  </div>
</template>

<script setup lang="ts">
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

useHead({
  title: "Lists",
});
</script>
