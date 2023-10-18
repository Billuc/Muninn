<template>
  <div class="inline-block">
    <Button :icon="faPen" @click="openModal" class="text-info btn-ghost" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Edit note "{{ props.note.title }}"</template>
      <template #default>
        <NoteForm v-model:name="name" v-model:tag-id="tagId" ref="form" />
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
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Note } from "~/models/Note";
import { useNoteStore } from "~/stores/noteStore";
import NoteForm from "./NoteForm.vue";

interface EditNoteProps {
  note: Note;
}

const props = defineProps<EditNoteProps>();
const store = useNoteStore();
const form = ref<InstanceType<typeof NoteForm> | null>(null);

const isOpened = ref(false);
const name = ref(props.note.title);
const tagId = ref(props.note.tagId);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

function editNote() {
  if (!form.value?.validate()) return;

  store.editNote(props.note.id, name.value, props.note.text, tagId.value);
  closeModal();
}
</script>
