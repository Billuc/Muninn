<template>
  <div>
    <PageHeading><span class="text-neutral">Notes</span></PageHeading>

    <div
      :class="
        mergeClasses(
          'flex',
          'flex-wrap',
          'items-center',
          'justify-center',
          'gap-x-4',
          'gap-y-2',
          'w-full',
          'my-4'
        )
      "
    >
      <NoteTagFilter
        :selected="selected"
        @update:selected="onUpdate"
        class="flex-grow"
      />
      <ManageNoteTags />
    </div>

    <NotesGrid :tag-filter="selected" />
  </div>
</template>

<script setup lang="ts">
import PageHeading from "~/components/layout/PageHeading.vue";
import ManageNoteTags from "~/components/notes/ManageNoteTags.vue";
import NoteTagFilter from "~/components/notes/NoteTagFilter.vue";
import NotesGrid from "~/components/notes/NotesGrid.vue";

const selected = ref<number[]>([]);

const onUpdate = (newSelected: number[]) => (selected.value = newSelected);

useHead({
  title: "Notes",
});
</script>
