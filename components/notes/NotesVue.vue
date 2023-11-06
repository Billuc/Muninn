<template>
  <div class="flex flex-col items-center gap-2">
    <NotesNoteTagFilter
      :selected="selected"
      @update:selected="(v) => (selected = v)"
    />

    <NotesGrid :tag-filter="selected" class="w-full" />
  </div>
</template>

<script setup lang="ts">
import { type ID } from "~/data/models/ID";

const selected = ref<ID>("");
</script>
