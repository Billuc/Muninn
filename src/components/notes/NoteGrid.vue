<script setup lang="ts">
import NoteGridElement from "./NoteGridElement.vue";
import { Note } from "@/data/models/Note";

interface NoteGridProps {
  notes: Note[];
}

const props = defineProps<NoteGridProps>();
</script>

<template>
  <div class="row wrap justify-start items-start content-start q-pa-sm">
    <template v-if="props.notes.length > 0">
      <NoteGridElement
        v-for="note in props.notes"
        :note="note"
        :key="note.id"
      />
    </template>
    <div v-else>No note yet</div>
  </div>
</template>
