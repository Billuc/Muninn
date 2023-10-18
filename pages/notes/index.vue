<template>
  <div>
    <PageHeading><span>Notes</span></PageHeading>
    <Background :icon="faLightbulb" />

    <NotesVue />
  </div>
</template>

<script setup lang="ts">
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import Background from "~/components/layout/Background.vue";
import PageHeading from "~/components/layout/PageHeading.vue";
import NotesVue from "~/components/notes/NotesVue.vue";

useHead({
  title: "Notes",
});
</script>
