<template>
  <div>
    <PageHeading><span class="text-neutral">Notes</span></PageHeading>

    <NoteTagFilter :selected="selected" @update:selected="onUpdate" />

    <NotesGrid :tag-filter="selected" />
  </div>
</template>

<script setup lang="ts">
import PageHeading from "~/components/layout/PageHeading.vue";
import NoteTagFilter from "~/components/notes/NoteTagFilter.vue";
import NotesGrid from "~/components/notes/NotesGrid.vue";

const selected = ref<number[]>([]);

const onUpdate = (newSelected: number[]) => (selected.value = newSelected);

useHead({
  title: "Notes",
});
</script>
