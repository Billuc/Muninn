<template>
  <div>
    <Button
      :icon="faBroom"
      label="Clear checked"
      @click="openModal"
      class="btn-error"
    />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>
        Are you sure you want to remove checked elements ?
      </template>
      <template #actions>
        <Button class="btn-error" @click="closeModal">No</Button>
        <Button class="btn-success ml-2" @click="clear">Yes</Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "~/stores/todoStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import { ToDoList } from "~/models/ToDo";
import { faBroom } from "@fortawesome/free-solid-svg-icons";

interface ClearCheckedButtonProps {
  todolist: ToDoList;
}

const props = defineProps<ClearCheckedButtonProps>();
const store = useTodoStore();
const isOpened = ref(false);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

function clear() {
  store.removeChecked(props.todolist.id);
  closeModal();
}
</script>
