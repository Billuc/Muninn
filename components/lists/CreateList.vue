<template>
  <div>
    <ListGridElement label="+" @click="openModal" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new list</template>
      <template #default>
        <div>
          <TextInput
            label="List name"
            :value="name"
            placeholder="Enter name..."
            input-class="input-primary"
            @input="setName"
          />
        </div>
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
import TextInput from "../TextInput.vue";
import ListGridElement from "./ListGridElement.vue";

const store = useListStore();
const isOpened = ref(false);
const name = ref("");

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);
const setName = (v: string) => (name.value = v);

function newList() {
  store.newList(name.value);
  closeModal();
}
</script>
