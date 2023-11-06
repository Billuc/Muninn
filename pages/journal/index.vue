<template>
  <div>
    <LayoutPageHeading><span>Journal</span></LayoutPageHeading>
    <LayoutBackground :icon="faJournalWhills" />

    <JournalPage />
  </div>
</template>

<script setup lang="ts">
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";

useHead({
  title: "Journal",
});
</script>
