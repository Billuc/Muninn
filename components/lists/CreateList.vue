<template>
  <div>
    <FABButton :icon="faPlus" @click="openModal" class="-bottom-6 right-4" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new list</template>
      <template #default>
        <ListForm v-model:name="name" ref="form" />
      </template>
      <template #actions>
        <Button class="btn-success" @click="newList">Create</Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useListStore } from "~/stores/listStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ListForm from "./ListForm.vue";

const store = useListStore();
const form = ref<InstanceType<typeof ListForm> | null>(null);

const isOpened = ref(false);
const name = ref("");

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const newList = () => {
  if (!form.value?.validate()) return;

  store.newList(name.value);
  closeModal();
  reset();
};
const reset = () => (name.value = "");
</script>
