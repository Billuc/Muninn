<template>
  <div>
    <NotesGridElement label="+" @click="openModal" :tags="[]" />

    <Dialog
      :is-opened="isOpened"
      @close="closeModal"
      class="overflow-y-visible"
    >
      <template #title>Create a new note</template>
      <template #default>
        <div class="form-control gap-y-2">
          <TextInput
            label="Note name"
            :value="name"
            placeholder="Enter name..."
            input-class="border-neutral"
            @input="setName"
          />
          <TagInput
            :tags="tagArray"
            :selected-tag-ids="tagIds"
            @new-tag="newTag"
            @remove-tag="removeTag"
            @select-tag="selectTag"
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
import TagInput from "../TagInput.vue";
import { storeToRefs } from "pinia";

const store = useNoteStore();
const isOpened = ref(false);
const name = ref("");
const tagIds = ref([] as number[]);
const { tags, nextTagId } = storeToRefs(store);

const tagArray = computed(() => [...tags.value.values()]);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);
const setName = (v: string) => (name.value = v);

const newNote = () => {
  store.newNote(name.value, tagIds.value);
  closeModal();
};
const newTag = (tagName: string) => {
  const tagId = nextTagId.value;
  store.newTag(tagName);
  tagIds.value.push(tagId);
};
const removeTag = (tagId: number) => {
  tagIds.value = tagIds.value.filter((id) => id !== tagId);
};
const selectTag = (tagId: number) => {
  if (tagIds.value.includes(tagId)) return;
  tagIds.value.push(tagId);
};
</script>
