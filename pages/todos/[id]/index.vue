<template>
  <div>
    <PageHeading>
      <span class="text-center text-secondary-focus mb-0 mr-2">{{
        todolist.title
      }}</span>

      <template #append>
        <div class="inline-block ml-2">
          <EditTodoList :todolist="todolist" />
          <DeleteTodoList :todolist="todolist" />
        </div>
      </template>
    </PageHeading>

    <div :class="mergeClasses('flex', 'justify-end', 'my-6')">
      <Toggle
        label="Show checked"
        :value="showChecked"
        @input="(v) => (showChecked = v)"
        toggle-class="toggle-secondary"
        class="w-fit"
      />
      <ClearCheckedButton :todolist="todolist" />
    </div>

    <TodoList :show-checked="showChecked" :todolist="todolist" />
  </div>
</template>

<script setup lang="ts">
import Toggle from "~/components/Toggle.vue";
import PageHeading from "~/components/layout/PageHeading.vue";
import ClearCheckedButton from "~/components/todos/ClearCheckedButton.vue";
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
