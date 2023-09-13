<template>
  <div>
    <PageHeading><span class="text-secondary-focus">ToDos</span></PageHeading>

    <TodosGrid />
  </div>
</template>

<script setup lang="ts">
import PageHeading from "~/components/layout/PageHeading.vue";
import TodosGrid from "~/components/todos/TodosGrid.vue";

useHead({
  title: "Todos",
});
</script>
