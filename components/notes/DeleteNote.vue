<template>
  <Action
    :icon="faTrash"
    label="Delete note"
    icon-class="text-error"
    @click="openModal"
  >
    <template #dialog>
      <Dialog :is-opened="isOpened" @close="closeModal">
        <template #title>
          Are you sure you want to remove note "{{ props.note.title }}" ?
        </template>
        <template #actions>
          <Button class="btn-error" @click="closeModal" :loading="loading">
            No
          </Button>
          <Button class="btn-success ml-2" @click="remove" :loading="loading">
            Yes
          </Button>
        </template>
      </Dialog>
    </template>
  </Action>
</template>

<script setup lang="ts">
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { type Note } from "~/data/models/Note";
import { NoteService } from "~/data/services/noteService";

interface DeleteNoteProps {
  note: Note;
}

const props = defineProps<DeleteNoteProps>();
const noteService = useService(NoteService);
const router = useRouter();
const isOpened = ref(false);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const { loading, execute: remove } = useAsyncAction(async () => {
  await noteService.remove(props.note.id);
  router.push({ name: "notes" });
  closeModal();
});
</script>
