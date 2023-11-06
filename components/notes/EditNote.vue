<template>
  <Action
    :icon="faPen"
    label="Edit note"
    icon-class="text-info"
    @click="openModal"
  >
    <template #dialog>
      <Dialog :is-opened="isOpened" @close="closeModal">
        <template #title>Edit note "{{ props.note.title }}"</template>
        <template #default>
          <NotesNoteForm
            v-model:name="name"
            v-model:tag-id="tagId"
            ref="form"
          />
        </template>
        <template #actions>
          <Button class="btn-success" @click="editNote" :loading="loading">
            Save
          </Button>
        </template>
      </Dialog>
    </template>
  </Action>
</template>

<script setup lang="ts">
import type { NotesNoteForm } from "#build/components";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { type Note } from "~/data/models/Note";
import { NoteService } from "~/data/services/noteService";

interface EditNoteProps {
  note: Note;
}

const props = defineProps<EditNoteProps>();
const noteService = useService(NoteService);

const form = ref<InstanceType<typeof NotesNoteForm> | null>(null);
const isOpened = ref(false);

const name = ref(props.note.title);
const tagId = ref(props.note.tagId);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const { loading, execute: editNote } = useAsyncAction(async () => {
  if (!form.value?.validate()) return;

  await noteService.update({
    id: props.note.id,
    title: name.value,
    tagId: tagId.value,
    text: props.note.text,
  });
  closeModal();
});
</script>
