<template>
  <div>
    <FABButton :icon="faPlus" @click="openModal" class="-bottom-4 right-4" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new note</template>
      <template #default>
        <NotesNoteForm v-model:name="name" v-model:tag-id="tagId" ref="form" />
      </template>
      <template #actions>
        <Button class="btn-success" @click="newNote" :loading="loading">
          Create
        </Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import type { NotesNoteForm } from "#build/components";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { NoteService } from "~/data/services/noteService";

const noteService = useService(NoteService);

const form = ref<InstanceType<typeof NotesNoteForm> | null>(null);
const isOpened = ref(false);

const name = ref("");
const tagId = ref("");

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const { loading, execute: newNote } = useAsyncAction(async () => {
  if (!form.value?.validate()) return;

  await noteService.create({ title: name.value, tagId: tagId.value, text: "" });
  closeModal();
  reset();
});
const reset = () => {
  name.value = "";
  tagId.value = "";
};
</script>
