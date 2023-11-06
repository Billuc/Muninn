<template>
  <div
    :class="
      mergeClasses('relative', 'flex', 'flex-col', 'flex-nowrap', 'gap-y-2')
    "
  >
    <NotesNoteEditorActions
      :editing="editing"
      :loading="loading"
      @edit="editing = true"
      @save="save"
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
import _ from "lodash";
import { type Note } from "~/data/models/Note";
import { NoteService } from "~/data/services/noteService";

interface NoteProps {
  note: Note;
}

const props = defineProps<NoteProps>();
const noteService = useService(NoteService);

const noteText = ref(props.note.text);
const editing = ref(false);

const updateNoteText = (newText: string) => {
  noteText.value = newText;
};

const { loading, execute: save } = useAsyncAction(async () => {
  await noteService.update({
    ...props.note,
    text: noteText.value,
  });
  editing.value = false;
});
</script>
