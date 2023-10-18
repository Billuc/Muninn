<template>
  <div class="inline-block">
    <Button :icon="faTrash" @click="openModal" class="text-error btn-ghost" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>
        Are you sure you want to remove note "{{ props.note.title }}" ?
      </template>
      <template #actions>
        <Button class="btn-error" @click="closeModal">No</Button>
        <Button class="btn-success ml-2" @click="remove">Yes</Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useNoteStore } from "~/stores/noteStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Note } from "~/models/Note";

interface DeleteNoteProps {
  note: Note;
}

const props = defineProps<DeleteNoteProps>();
const store = useNoteStore();
const router = useRouter();
const isOpened = ref(false);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

function remove() {
  store.removeNote(props.note.id);
  router.push({ name: "notes" });
  closeModal();
}
</script>
