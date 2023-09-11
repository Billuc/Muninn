<template>
  <div class="prose mx-auto">
    <div
      :class="
        mergeClasses(
          'flex',
          'flex-wrap',
          'justify-center',
          'items-center',
          'mb-6'
        )
      "
    >
      <h1 class="text-center text-neutral-focus mb-0 mr-2">
        {{ note.title }}
      </h1>

      <div class="inline-block ml-2">
        <EditNote :note="note" />
        <DeleteNote :note="note" />
      </div>
    </div>

    <Note :note="note" />
  </div>
</template>

<script setup lang="ts">
import DeleteNote from "~/components/notes/DeleteNote.vue";
import EditNote from "~/components/notes/EditNote.vue";
import Note from "~/components/notes/Note.vue";
import { useNoteStore } from "~/stores/noteStore";

const route = useRoute();
const store = useNoteStore();
const noteId = Number(route.params.id);
const note = store.getNote(noteId);

useHead({
  title: `Notes - ${note.title}`,
});
</script>
