<template>
  <LayoutLoading v-if="loadingNotes || loadingNoteTags" />
  <div
    v-else
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
      v-for="[note, tag] in notesAndTags"
      :key="`note-${note.id}`"
      :label="note.title"
      :href="`/notes/${note.id}`"
      :tag="tag"
    />
    <NotesCreateNote />
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { type ID } from "~/data/models/ID";
import type { Note } from "~/data/models/Note";
import type { Tag } from "~/data/models/Tag";
import { NoteService } from "~/data/services/noteService";
import { NoteTagService } from "~/data/services/noteTagService";

interface NotesGridProps {
  tagFilter: ID;
}

const props = defineProps<NotesGridProps>();
const noteService = useService(NoteService);
const noteTagService = useService(NoteTagService);

const { pending: loadingNotes, data: notes } = useLazyAsyncData("notes", () =>
  noteService.getAll()
);
const { pending: loadingNoteTags, data: noteTags } = useLazyAsyncData(() =>
  noteTagService.getAll()
);
useSubscription(noteService, notes);

const notesAndTags = computed(() => {
  if (!notes.value || !noteTags.value) return [];

  const tagsById = _.groupBy(noteTags.value, "id");
  const filteredNotes = notes.value.filter(
    (n) => !props.tagFilter || props.tagFilter === n.tagId
  );
  const joinedNotesAndTags: [Note, Tag][] = _.map(filteredNotes, (note) => [
    note,
    tagsById[note.tagId]?.[0],
  ]);
  return joinedNotesAndTags;
});
</script>
