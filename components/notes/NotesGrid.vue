<template>
  <div class="py-2">
    <ul
      :class="
        mergeClasses(
          'grid',
          'grid-cols-1',
          'md:grid-cols-2',
          'gap-1',
          'p-0'
        )
      "
    >
      <NotesGridElement
        v-for="[id, note] in notes"
        :key="`note-${note.id}`"
        :label="note.title"
        :href="`/notes/${note.id}`"
      />
      <CreateNote />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNoteStore } from "~/stores/noteStore";
import NotesGridElement from "./NotesGridElement.vue";
import CreateNote from "./CreateNote.vue";

const store = useNoteStore();
const { notes } = storeToRefs(store);
</script>
