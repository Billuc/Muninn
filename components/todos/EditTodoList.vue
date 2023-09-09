<template>
  <div class="inline-block">
    <Button :icon="faPen" @click="openModal" class="text-info btn-ghost" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Edit todolist "{{ props.todolist.title }}"</template>
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
        <Button class="btn-success" label="Save" @click="editTodoList"></Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "~/stores/todoStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import TextInput from "../TextInput.vue";
import { ToDoList } from "~/models/ToDo";
import { faPen } from "@fortawesome/free-solid-svg-icons";

interface EditTodoListProps {
  todolist: ToDoList;
}

const props = defineProps<EditTodoListProps>();
const store = useTodoStore();
const isOpened = ref(false);
const name = ref(props.todolist.title);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);
const setName = (v: string) => (name.value = v);

function editTodoList() {
  store.editList(props.todolist.id, name.value);
  closeModal();
}
</script>
