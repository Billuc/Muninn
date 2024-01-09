<script setup lang="ts">
import NoteForm from "./NoteForm.vue";
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { Note } from "@/data/models/Note";
import { NoteService } from "@/data/services/noteService";

interface EditNoteProps {
  note: Note;
}

const props = defineProps<EditNoteProps>();

const dialogOpened = ref(false);
const noteService = useService(NoteService);

const name = ref(props.note.title);
const tagId = ref(props.note.tagId);
const updating = ref(false);

const editNote = async () => {
  updating.value = true;
  await noteService.update({
    ...props.note,
    title: name.value,
    tagId: tagId.value,
  });

  setTimeout(() => {
    updating.value = false;
    dialogOpened.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <PageAction
      color="secondary"
      icon="mdi-pen"
      label="Edit Note"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="editNote">
      <template #title>Edit {{ props.note.title }}</template>

      <template #form>
        <NoteForm v-model:title="name" v-model:tag-id="tagId" />
      </template>

      <template #actions>
        <QBtn type="reset" color="info">Clear</QBtn>
        <QBtn type="submit" color="positive" :loading="updating">Save</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
