<template>
  <div>
    <PageHeading><span class="text-primary-focus">Journal</span></PageHeading>

    <div class="flex flex-wrap justify-center my-4 gap-y-1">
      <DateSelector :value="date" @input="changeDate" class="input-primary" />
      <DayOfWeekSelector :value="date" @input="changeDate" />
    </div>

    <h3 class="text-primary-focus text-xl font-bold">
      {{ format(date, "MMM d") }}
    </h3>
    <h2 class="text-primary-focus text-2xl font-extrabold">
      {{ format(date, "EEEE") }}
    </h2>

    <EntryList :date="date" class="mt-4" />
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import DateSelector from "~/components/DateSelector.vue";
import DayOfWeekSelector from "~/components/DayOfWeekSelector.vue";
import EntryList from "~/components/journal/EntryList.vue";
import PageHeading from "~/components/layout/PageHeading.vue";

useHead({
  title: "Journal",
});

const date = ref(new Date());

function changeDate(newDate: Date) {
  date.value = newDate;
}
</script>
