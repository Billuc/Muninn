<template>
  <div :class="mergeClasses('flex', 'flex-col', 'flex-nowrap', 'gap-y-2')">
    <MultilineField
      :value="note.text"
      placeholder="Write here..."
      @input="debouncedUpdateNoteText"
      :class="
        mergeClasses('textarea', 'textarea-md', 'bg-base-200', 'shadow-md')
      "
    />
  </div>
</template>

<script setup lang="ts">
import { useNoteStore } from "~/stores/noteStore";
import _ from "lodash";
import { Note } from "~/models/Note";

interface NoteProps {
  note: Note;
}

const props = defineProps<NoteProps>();
const { note } = toRefs(props);
const store = useNoteStore();

function updateNoteText(newText: string) {
  store.editNote(note.value.id, note.value.title, newText, note.value.tagId);
}
const debouncedUpdateNoteText = _.debounce(updateNoteText, 2000);
</script>
