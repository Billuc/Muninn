<template>
  <div>
    <PageHeading><span>Journal</span></PageHeading>
    <Background :icon="faJournalWhills" />

    <JournalPage />
  </div>
</template>

<script setup lang="ts">
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";
import JournalPage from "~/components/journal/JournalPage.vue";
import Background from "~/components/layout/Background.vue";
import PageHeading from "~/components/layout/PageHeading.vue";

useHead({
  title: "Journal",
});
</script>
