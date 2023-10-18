<template>
  <div>
    <PageHeading><span>Journal</span></PageHeading>
    <Background :icon="faJournalWhills" />

    <div class="flex flex-col items-center justify-center my-4 gap-4">
      <div class="flex flex-nowrap gap-x-4">
        <DateSelector v-model:value="date" />
        <Button @click="date = new Date()" class="btn-primary btn-outline">Today</Button>
      </div>
      
      <DayOfWeekSelector v-model:value="date" />
    </div>

    <DateDisplay :date="date" />

    <EntryList :date="date" class="mt-4" />
  </div>
</template>

<script setup lang="ts">
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button.vue";
import DateSelector from "~/components/DateSelector.vue";
import DateDisplay from "~/components/journal/DateDisplay.vue";
import DayOfWeekSelector from "~/components/journal/DayOfWeekSelector.vue";
import EntryList from "~/components/journal/EntryList.vue";
import Background from "~/components/layout/Background.vue";
import PageHeading from "~/components/layout/PageHeading.vue";

useHead({
  title: "Journal",
});

const date = ref(new Date());
</script>
