<template>
  <div class="inline-block">
    <Button :icon="faTrash" @click="openModal" class="text-error btn-ghost" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>
        Are you sure you want to remove list "{{ props.list.title }}" ?
      </template>
      <template #actions>
        <Button class="btn-error" @click="closeModal">No</Button>
        <Button class="btn-success ml-2" @click="remove">Yes</Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useListStore } from "~/stores/listStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { List } from "~/models/List";

interface DeleteListProps {
  list: List;
}

const props = defineProps<DeleteListProps>();
const store = useListStore();
const router = useRouter();
const isOpened = ref(false);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

function remove() {
  store.removeList(props.list.id);
  router.push({ name: "lists" });
  closeModal();
}
</script>
