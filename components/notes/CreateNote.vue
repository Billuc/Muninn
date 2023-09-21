<template>
  <div>
    <FABButton
      :icon="faPlus"
      @click="openModal"
      class="btn-primary -bottom-6 right-4"
    />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new note</template>
      <template #default>
        <div class="form-control gap-y-2">
          <TextInput
            label="Note name"
            :value="name"
            placeholder="Enter name..."
            input-class="border-primary"
            @input="setName"
          />
          <TagSelecter
            :tags="tags"
            :selected="tagId"
            @update:selected="setTagId"
          />
        </div>
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
import TextInput from "../TextInput.vue";
import NotesGridElement from "./NotesGridElement.vue";
import TagSelecter from "../TagSelecter.vue";
import FABButton from "../FABButton.vue";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const store = useNoteStore();
const tags = store.tagArray;

const isOpened = ref(false);
const name = ref("");
const tagId = ref(-1);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);
const setName = (v: string) => (name.value = v);
const setTagId = (v: number) => (tagId.value = v);

const newNote = () => {
  store.newNote(name.value, tagId.value);
  closeModal();
};
</script>
