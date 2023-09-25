<template>
  <div class="inline-block">
    <Button :icon="faPen" @click="openModal" class="text-info btn-ghost" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Edit note "{{ props.note.title }}"</template>
      <template #default>
        <div class="form-control gap-y-2">
          <InputAlt
            type="text"
            label="NoteName"
            placeholder="Enter name..."
            v-model="name"
            :icon="faTag"
          />
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
        <Button class="btn-success" @click="editNote">Save</Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import InputAlt from "../InputAlt.vue";
import TagSelecter from "../TagSelecter.vue";
import TextInput from "../TextInput.vue";
import { faPen, faTag } from "@fortawesome/free-solid-svg-icons";
import { Note } from "~/models/Note";
import { useNoteStore } from "~/stores/noteStore";

interface EditNoteProps {
  note: Note;
}

const props = defineProps<EditNoteProps>();
const store = useNoteStore();
const tags = store.tagArray;

const isOpened = ref(false);
const name = ref(props.note.title);
const tagId = ref(props.note.tagId);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);
const setName = (v: string) => (name.value = v);
const setTagId = (v: number) => (tagId.value = v);

function editNote() {
  store.editNote(props.note.id, name.value, props.note.text, tagId.value);
  closeModal();
}
</script>
