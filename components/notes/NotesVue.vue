<template>
  <div class="flex flex-col items-center gap-2">
    <NoteTagFilter
      :selected="selected"
      @update:selected="(v) => (selected = v)"
    />

    <NotesGrid :tag-filter="selected" class="w-full" />
  </div>
</template>

<script setup lang="ts">
import NoteTagFilter from "~/components/notes/NoteTagFilter.vue";
import NotesGrid from "~/components/notes/NotesGrid.vue";

const selected = ref<number>(-1);
</script>
