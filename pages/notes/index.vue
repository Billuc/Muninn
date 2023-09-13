<template>
  <div>
    <PageHeading><span class="text-neutral">Notes</span></PageHeading> 

    <NotesGrid />
  </div>
</template>

<script setup lang="ts">
import PageHeading from "~/components/layout/PageHeading.vue";
import NotesGrid from "~/components/notes/NotesGrid.vue";

useHead({
  title: "Notes",
});
</script>
