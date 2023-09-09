<template>
  <div>
    <NotesGridElement label="+" @click="openModal" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new note</template>
      <template #default>
        <div>
          <TextInput
            label="Note name"
            :value="name"
            placeholder="Enter name..."
            input-class="input-neutral"
            @input="setName"
          />
        </div>
      </template>
      <template #actions>
        <Button
          class="btn-success"
          label="Create"
          @click="newNote"
        ></Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useNoteStore } from "~/stores/noteStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import TextInput from "../TextInput.vue";
import NotesGridElement from "./NotesGridElement.vue";

const store = useNoteStore();
const isOpened = ref(false);
const name = ref("");

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);
const setName = (v: string) => (name.value = v);

function newNote() {
  store.newNote(name.value, []);
  closeModal();
}
</script>
