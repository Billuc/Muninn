<template>
  <div class="prose mx-auto">
    <div
      :class="
        mergeClasses(
          'flex',
          'flex-wrap',
          'justify-center',
          'items-center',
          'mb-6'
        )
      "
    >
      <h1 class="text-center text-secondary-focus mb-0 mr-2">
        {{ todolist.title }}
      </h1>

      <div class="inline-block ml-2">
        <EditTodoList :todolist="todolist" />
        <DeleteTodoList :todolist="todolist" />
      </div>
    </div>

    <Toggle
      label="Show checked"
      :value="showChecked"
      @input="(v) => (showChecked = v)"
      toggle-class="toggle-secondary"
      class="w-fit my-4"
    />

    <TodoList :show-checked="showChecked" :todolist="todolist" />
  </div>
</template>

<script setup lang="ts">
import Toggle from "~/components/Toggle.vue";
import DeleteTodoList from "~/components/todos/DeleteTodoList.vue";
import EditTodoList from "~/components/todos/EditTodoList.vue";
import TodoList from "~/components/todos/TodoList.vue";
import { useTodoStore } from "~/stores/todoStore";

const route = useRoute();
const store = useTodoStore();
const listId = Number(route.params.id);
const todolist = store.getList(listId);
const showChecked = ref(false);

useHead({
  title: `Todos - ${todolist.title}`,
});
</script>
