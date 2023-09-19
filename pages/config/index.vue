<template>
  <div>
    <PageHeading>Configuration</PageHeading>

    <h2 class="text-2xl font-bold my-4">Theme</h2>

    <ThemeSelector />

    <h2 class="text-2xl font-bold my-4">Events</h2>

    <EventsConfig />

    <h2 class="text-2xl font-bold my-4">Notes</h2>

    <NotesConfig />
  </div>
</template>

<script setup lang="ts">
import ThemeSelector from "@/components/config/ThemeSelector.vue";
import EventsConfig from "~/components/config/EventsConfig.vue";
import NotesConfig from "~/components/config/NotesConfig.vue";
import PageHeading from "~/components/layout/PageHeading.vue";

useHead({
  title: "Configuration",
});
</script>
