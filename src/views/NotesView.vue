<script setup lang="ts">
import NoteGrid from "@/components/notes/NoteGrid.vue";
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import CreateNote from "@/components/notes/CreateNote.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ref } from "vue";
import { NoteService } from "@/data/services/noteService";

const noteService = useService(NoteService);

const notesData = await noteService.getAll();
const notes = ref(notesData);
useSubscription(noteService, notes);
</script>

<template>
  <div>
    <Title>
      <template #text>Notes</template>
    </Title>

    <PageActions>
      <CreateNote />
    </PageActions>

    <NoteGrid :notes="notes" />
  </div>
</template>
