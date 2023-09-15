<template>
  <div
    :class="
      mergeClasses('m-0', 'flex', 'flex-nowrap', 'items-center', 'gap-x-2')
    "
  >
    <div class="w-[14px] h-4 flex-shrink-0"></div>
    <Checkbox :value="false" disabled class="checkbox-secondary" />
    <MultilineInput
      :value="todoText"
      placeholder="Write here..."
      @input="(v) => (todoText = v)"
      class="w-full"
      detect-enter
      @enter="addTodo"
    />
    <Button :icon="faPlus" class="btn-circle !btn-xs" @click="addTodo" />
  </div>
</template>

<script setup lang="ts">
import MultilineInput from "../MultilineInput.vue";
import Checkbox from "../Checkbox.vue";
import Button from "../Button.vue";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTodoStore } from "~/stores/todoStore";

interface AddTodoProps {
  listId: number;
}

const props = defineProps<AddTodoProps>();
const store = useTodoStore();
const todoText = ref("");

const addTodo = () => {
  store.newTodo(props.listId, todoText.value);
  todoText.value = "";
};
</script>
