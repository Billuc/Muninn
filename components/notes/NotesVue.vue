<template>
  <div class="grid grid-cols-1 lg:grid-cols-9">
    <NoteTagFilter
      :selected="selected"
      @update:selected="(v) => (selected = v)"
      class="w-full my-2 lg:flex-col lg:col-span-2"
    />

    <NotesGrid :tag-filter="selected" class="mx-auto lg:col-span-7 w-full" />
  </div>
</template>

<script setup lang="ts">
import NoteTagFilter from "~/components/notes/NoteTagFilter.vue";
import NotesGrid from "~/components/notes/NotesGrid.vue";

const selected = ref<number>(-1);
</script>
