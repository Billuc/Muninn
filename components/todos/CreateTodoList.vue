<template>
  <div>
    <TodosGridElement label="+" @click="openModal" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new Todo list</template>
      <template #default>
        <div>
          <TextInput
            label="Todolist name"
            :value="name"
            placeholder="Enter name..."
            input-class="input-secondary"
            @input="setName"
          />
        </div>
      </template>
      <template #actions>
        <Button class="btn-success" @click="newTodoList">Create</Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "~/stores/todoStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import TextInput from "../TextInput.vue";
import TodosGridElement from "./TodosGridElement.vue";

const store = useTodoStore();
const isOpened = ref(false);
const name = ref("");

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);
const setName = (v: string) => (name.value = v);

function newTodoList() {
  store.newList(name.value);
  closeModal();
}
</script>
