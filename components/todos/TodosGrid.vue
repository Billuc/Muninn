<template>
  <ul
    :class="
      mergeClasses('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-1', 'p-0')
    "
  >
    <TodosGridElement
      v-for="[id, list] in todoLists"
      :key="`todolist-${list.id}`"
      :label="list.title"
      :href="`/todos/${list.id}`"
    />
    <CreateTodoList />
  </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTodoStore } from "~/stores/todoStore";
import TodosGridElement from "./TodosGridElement.vue";
import CreateTodoList from "./CreateTodoList.vue";

const store = useTodoStore();
const { todoLists } = storeToRefs(store);
</script>
