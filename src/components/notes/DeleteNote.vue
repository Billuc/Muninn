<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { useRouter } from "vue-router";
import { Note } from "@/data/models/Note";
import { NoteService } from "@/data/services/noteService";

interface DeleteNoteProps {
  note: Note;
}

const props = defineProps<DeleteNoteProps>();

const dialogOpened = ref(false);
const noteService = useService(NoteService);
const router = useRouter();

const removing = ref(false);

const deleteNote = async () => {
  removing.value = true;
  await noteService.remove(props.note.id);

  setTimeout(() => {
    removing.value = false;
    dialogOpened.value = false;
    router.push({ name: "notes" });
  }, 100);
};
</script>

<template>
  <div>
    <PageAction
      color="secondary"
      icon="mdi-delete"
      label="Delete Note"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="deleteNote">
      <template #title>
        Are you sure you want to delete note {{ props.note.title }}
      </template>

      <template #actions>
        <QBtn :loading="removing" @click="dialogOpened = false">No</QBtn>
        <QBtn type="submit" :loading="removing">Yes</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
