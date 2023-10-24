<template>
  <Action
    :icon="faTrash"
    icon-class="text-error"
    label="Delete list"
    @click="openModal"
  >
    <template #dialog>
      <Dialog :is-opened="isOpened" @close="closeModal">
        <template #title>
          Are you sure you want to remove list "{{ props.list.title }}" ?
        </template>
        <template #actions>
          <Button class="btn-error" @click="closeModal">No</Button>
          <Button class="btn-success ml-2" @click="remove">Yes</Button>
        </template>
      </Dialog>
    </template>
  </Action>
</template>

<script setup lang="ts">
import { useListStore } from "~/stores/listStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { List } from "~/models/List";
import Action from "../Action.vue";

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
