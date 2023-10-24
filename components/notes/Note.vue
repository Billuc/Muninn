<template>
  <div
    :class="
      mergeClasses('relative', 'flex', 'flex-col', 'flex-nowrap', 'gap-y-2')
    "
  >
    <NoteEditorActions
      :editing="editing"
      @edit="editing = true"
      @save="save"
      @cancel="cancel"
    />
    <MarkdownEditor
      :value="noteText"
      placeholder="Write here..."
      @update:value="updateNoteText"
      :editing="editing"
    />
  </div>
</template>

<script setup lang="ts">
import { useNoteStore } from "~/stores/noteStore";
import _ from "lodash";
import { Note } from "~/models/Note";
import MarkdownEditor from "../MarkdownEditor.vue";
import NoteEditorActions from "./NoteEditorActions.vue";

interface NoteProps {
  note: Note;
}

const props = defineProps<NoteProps>();
const store = useNoteStore();

const noteText = ref(props.note.text);
const editing = ref(false);

const updateNoteText = (newText: string) => {
  noteText.value = newText;
};
const save = () => {
  updateNote();
  nextTick(() => editing.value = false);
};
const cancel = () => {
  noteText.value = props.note.text;
  nextTick(() => editing.value = false);
};

function updateNote() {
  store.editNote(
    props.note.id,
    props.note.title,
    noteText.value,
    props.note.tagId
  );
}
</script>
