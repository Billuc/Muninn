<template>
  <div>
    <PageHeading><span>Journal</span></PageHeading>
    <Background :icon="faJournalWhills" />

    <div class="flex flex-wrap justify-center my-4 gap-2">
      <div>
        <DateSelector
          :value="date"
          @input="changeDate"
          class="input-primary input-sm"
        />
      </div>
      <DayOfWeekSelector :value="date" @input="changeDate" />
    </div>

    <DateDisplay :date="date" />

    <EntryList :date="date" class="mt-4" />
  </div>
</template>

<script setup lang="ts">
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import DateSelector from "~/components/DateSelector.vue";
import DayOfWeekSelector from "~/components/DayOfWeekSelector.vue";
import DateDisplay from "~/components/journal/DateDisplay.vue";
import EntryList from "~/components/journal/EntryList.vue";
import Background from "~/components/layout/Background.vue";
import PageHeading from "~/components/layout/PageHeading.vue";

useHead({
  title: "Journal",
});

const date = ref(new Date());

function changeDate(newDate: Date) {
  date.value = newDate;
}
</script>
