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
        :tag="getTag(note.tagId)"
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
  tagFilter: number;
}

const props = defineProps<NotesGridProps>();
const store = useNoteStore();
const { notes } = storeToRefs(store);

const filteredNotes = computed(() =>
  [...notes.value.values()].filter(
    (n) => props.tagFilter < 0 || props.tagFilter === n.tagId
  )
);

const getTag = (id: number) => store.tags.get(id);
</script>
