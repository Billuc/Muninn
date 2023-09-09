<template>
  <div class="inline-block">
    <Button :icon="faTrash" @click="openModal" class="text-error btn-ghost" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title
        >Are you sure you want to remove todolist "{{ props.todolist.title }}"
        ?</template
      >
      <template #actions>
        <Button class="btn-error" label="No" @click="closeModal"></Button>
        <Button class="btn-success ml-2" label="Yes" @click="remove"></Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "~/stores/todoStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToDoList } from "~/models/ToDo";

interface DeleteTodoListProps {
  todolist: ToDoList;
}

const props = defineProps<DeleteTodoListProps>();
const store = useTodoStore();
const router = useRouter();
const isOpened = ref(false);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

function remove() {
  store.removeList(props.todolist.id);
  router.push({ path: "/todos" });
  closeModal();
}
</script>
