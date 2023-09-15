<template>
  <div class="py-2">
    <ul
      :class="
        mergeClasses('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-1', 'p-0')
      "
    >
      <NotesGridElement
        v-for="note in filteredNotes"
        :key="`note-${note.id}`"
        :label="note.title"
        :href="`/notes/${note.id}`"
        :tags="getTags(note.tagIds)"
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
import _ from "lodash";

interface NotesGridProps {
  tagFilter: number[];
}

const props = defineProps<NotesGridProps>();
const store = useNoteStore();
const { notes } = storeToRefs(store);

const filteredNotes = computed(() =>
  [...notes.value.values()].filter(
    (n) => _.difference(props.tagFilter, n.tagIds).length === 0
  )
);

const getTags = (ids: number[]) =>
  [...store.tags.values()].filter((t) => ids.includes(t.id));
</script>
