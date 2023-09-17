<template>
  <div>
    <PageHeading><span class="text-primary">Lists</span></PageHeading>

    <TodosGrid />
  </div>
</template>

<script setup lang="ts">
import PageHeading from "~/components/layout/PageHeading.vue";
import TodosGrid from "~/components/todos/TodosGrid.vue";

useHead({
  title: "Lists",
});
</script>
