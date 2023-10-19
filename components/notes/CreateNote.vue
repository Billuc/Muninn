<template>
  <div>
    <FABButton :icon="faPlus" @click="openModal" class="-bottom-6 right-4" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new note</template>
      <template #default>
        <NoteForm v-model:name="name" v-model:tag-id="tagId" ref="form" />
      </template>
      <template #actions>
        <Button class="btn-success" @click="newNote">Create</Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useNoteStore } from "~/stores/noteStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import FABButton from "../FABButton.vue";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NoteForm from "./NoteForm.vue";

const store = useNoteStore();
const form = ref<InstanceType<typeof NoteForm> | null>(null);

const isOpened = ref(false);
const name = ref("");
const tagId = ref("");

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const newNote = () => {
  if (!form.value?.validate()) return;

  store.newNote(name.value, tagId.value);
  closeModal();
  reset();
};
const reset = () => {
  name.value = "";
  tagId.value = "";
};
</script>
