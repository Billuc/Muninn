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
import { useListStore } from "~/stores/listStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import { List } from "~/models/List";
import { faBroom } from "@fortawesome/free-solid-svg-icons";

interface ClearCheckedButtonProps {
  list: List;
}

const props = defineProps<ClearCheckedButtonProps>();
const store = useListStore();
const isOpened = ref(false);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

function clear() {
  store.removeChecked(props.list.id);
  closeModal();
}
</script>
