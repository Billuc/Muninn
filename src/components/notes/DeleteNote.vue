<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { Note } from "@/data/models/Note";
import { NoteService } from "@/data/services/noteService";
import CardActionBase from "../boards/CardActionBase.vue";
import { NoteOnlineService } from "@/data/services/noteOnlineService";

interface DeleteNoteProps {
  note: Note;
  online: boolean;
}

const noteOfflineService = useService(NoteService);
const noteOnlineService = useService(NoteOnlineService);

const props = defineProps<DeleteNoteProps>();

const noteService = props.online ? noteOnlineService : noteOfflineService;

const dialogOpened = ref(false);
const removing = ref(false);

const deleteNote = async () => {
  removing.value = true;
  await noteService.remove(props.note.id);

  setTimeout(() => {
    removing.value = false;
    dialogOpened.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <CardActionBase
      color="secondary"
      icon="mdi-delete"
      tooltip="Delete Note"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="deleteNote">
      <template #title>
        Are you sure you want to delete note {{ props.note.title }}
      </template>

      <template #actions>
        <QBtn
          :loading="removing"
          @click="dialogOpened = false"
          color="secondary"
        >
          No
        </QBtn>
        <QBtn type="submit" :loading="removing" color="primary">Yes</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
