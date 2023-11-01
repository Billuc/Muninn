<template>
  <Action
    :icon="faBroom"
    icon-class="text-error"
    label="Clear checked"
    @click="openModal"
  >
    <template #dialog>
      <Dialog :is-opened="isOpened" @close="closeModal">
        <template #title>
          Are you sure you want to remove checked elements ?
        </template>
        <template #actions>
          <Button class="btn-error" @click="closeModal">No</Button>
          <Button class="btn-success ml-2" @click="clear">Yes</Button>
        </template>
      </Dialog>
    </template>
  </Action>
</template>

<script setup lang="ts">
import { useListStore } from "~/stores/listStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import { List } from "~/data/models/List";
import { faBroom } from "@fortawesome/free-solid-svg-icons";
import Action from "../Action.vue";

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
