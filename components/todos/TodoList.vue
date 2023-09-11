<template>
  <div :class="mergeClasses('flex', 'flex-col', 'flex-nowrap', 'gap-y-2')">
    <TodosTodo
      v-for="(value, key) in filteredTodos"
      :todo="value"
      @update:title="(t) => updateTodo(Number(key), t, value.done)"
      @update:done="(d) => updateTodo(Number(key), value.title, d)"
    />
    <TodosTodo :todo="newTodo" @update:title="createTodo" />
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "@/stores/todoStore";
import TodosTodo from "./Todo.vue";
import { ToDo, ToDoList } from "~/models/ToDo";
import _ from "lodash";

interface TodoListProps {
  showChecked: boolean;
  todolist: ToDoList;
}

const props = defineProps<TodoListProps>();
const { showChecked, todolist } = toRefs(props);
const store = useTodoStore();
const filteredTodos = computed(() =>
  _.pickBy(todolist.value.todos, (v) => !v.done || showChecked.value)
);
const newTodo: ToDo = {
  id: -1,
  done: false,
  title: "",
};

function updateTodo(todoId: number, newTitle: string, newDone: boolean) {
  if (!newTitle) store.removeTodo(todolist.value.id, todoId);
  else store.editTodo(todolist.value.id, todoId, newTitle, newDone);
}

function createTodo(title: string) {
  if (!title) return;
  store.newTodo(todolist.value.id, title);
}
</script>
