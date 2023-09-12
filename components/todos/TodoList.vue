<template>
  <div :class="mergeClasses('flex', 'flex-col', 'flex-nowrap', 'gap-y-2')">
    <Draggable v-model="todoArray" handle=".handle" item-key="id" :animation="150">
      <template #item="{ element }">
        <TodosTodo
          v-if="!element.done || showChecked"
          :list-id="todolist.id"
          :todo="element"
        />
      </template>
    </Draggable>

    <AddTodo :list-id="todolist.id" />
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "@/stores/todoStore";
import TodosTodo from "./Todo.vue";
import { ToDoList } from "~/models/ToDo";
import _ from "lodash";
import Draggable from "vuedraggable";
import AddTodo from "./AddTodo.vue";

interface TodoListProps {
  showChecked: boolean;
  todolist: ToDoList;
}

const props = defineProps<TodoListProps>();
const { showChecked, todolist } = toRefs(props);
const store = useTodoStore();

const todoArray = computed({
  get() {
    return _.sortBy([...todolist.value.todos.values()], (todo) => todo.index);
  },
  set(newArray) {
    store.orderTodos(todolist.value.id, newArray);
  },
});
</script>
