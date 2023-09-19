<template>
  <div>
    <PageHeading><span>Notes</span></PageHeading>

    <NoteTagFilter
      :selected="selected"
      @update:selected="onUpdate"
      class="w-full my-2"
    />

    <NotesGrid :tag-filter="selected" />
  </div>
</template>

<script setup lang="ts">
import PageHeading from "~/components/layout/PageHeading.vue";
import NoteTagFilter from "~/components/notes/NoteTagFilter.vue";
import NotesGrid from "~/components/notes/NotesGrid.vue";

const selected = ref<number>(-1);

const onUpdate = (newSelected: number) => (selected.value = newSelected);

useHead({
  title: "Notes",
});
</script>
