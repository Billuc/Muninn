<template>
  <div
    :class="
      mergeClasses('relative', 'flex', 'flex-col', 'flex-nowrap', 'gap-y-2')
    "
  >
    <MultilineInput
      :value="noteText"
      placeholder="Write here..."
      @update:value="updateNoteText"
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
import MultilineInput from "../MultilineInput.vue";

interface NoteProps {
  note: Note;
}

const props = defineProps<NoteProps>();
const store = useNoteStore();

const noteText = ref(props.note.text);

const updateNoteText = (newText: string) => {
  noteText.value = newText;
  debouncedUpdateNote();
};

function updateNote() {
  store.editNote(
    props.note.id,
    props.note.title,
    noteText.value,
    props.note.tagId
  );
}
const debouncedUpdateNote = _.debounce(updateNote, 2000);
</script>
