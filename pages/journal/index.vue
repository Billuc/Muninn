<template>
  <div class="prose mx-auto">
    <h1 class="text-center text-primary-focus">Journal</h1>

    <div class="flex flex-wrap justify-center my-4 gap-y-1">
      <DateSelector :value="date" @input="changeDate" class="input-primary" />
      <DayOfWeekSelector :value="date" @input="changeDate" />
    </div>

    <h3 class="m-0 text-primary-focus">{{ format(date, "MMM d") }}</h3>
    <h2 class="text-primary-focus">{{ format(date, "EEEE") }}</h2>

    <EntryList :date="date" />
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import DateSelector from "~/components/DateSelector.vue";
import DayOfWeekSelector from "~/components/DayOfWeekSelector.vue";
import EntryList from "~/components/journal/EntryList.vue";

useHead({
  title: "Journal",
});

const date = ref(new Date());

function changeDate(newDate: Date) {
  date.value = newDate;
}
</script>
