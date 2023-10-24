<template>
  <Actions>
    <EditNote :note="props.note" />
    <DeleteNote :note="props.note" />
  </Actions>
</template>

<script setup lang="ts">
import { Note } from "~/models/Note";
import Actions from "../Actions.vue";
import DeleteNote from "./DeleteNote.vue";
import EditNote from "./EditNote.vue";

interface NoteActionsProps {
  note: Note;
}

const props = defineProps<NoteActionsProps>();
</script>
