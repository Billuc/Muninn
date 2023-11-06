<template>
  <Actions>
    <NotesEditNote :note="props.note" />
    <NotesDeleteNote :note="props.note" />
  </Actions>
</template>

<script setup lang="ts">
import { type Note } from "~/data/models/Note";

interface NoteActionsProps {
  note: Note;
}

const props = defineProps<NoteActionsProps>();
</script>
