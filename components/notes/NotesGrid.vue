<template>
  <div
    :class="
      mergeClasses(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'gap-2',
        'py-2',
        'relative'
      )
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
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNoteStore } from "~/stores/noteStore";
import NotesGridElement from "./NotesGridElement.vue";
import CreateNote from "./CreateNote.vue";
import _ from "lodash";
import { ID } from "~/models/ID";

interface NotesGridProps {
  tagFilter: ID;
}

const props = defineProps<NotesGridProps>();
const store = useNoteStore();
const { notes } = storeToRefs(store);

const filteredNotes = computed(() =>
  [...notes.value.values()].filter(
    (n) => !props.tagFilter || props.tagFilter === n.tagId
  )
);

const getTag = (id: ID) => store.tags.get(id);
</script>
