<template>
  <div>
    <LayoutPageHeading><span>Notes</span></LayoutPageHeading>
    <LayoutBackground :icon="faLightbulb" />

    <NotesVue />
  </div>
</template>

<script setup lang="ts">
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

useHead({
  title: "Notes",
});
</script>
