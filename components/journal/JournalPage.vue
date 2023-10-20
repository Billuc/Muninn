<template>
  <div>
    <div class="flex flex-col items-center justify-center my-4 gap-2">
      <Button
        @click="date = new Date()"
        :class="
          mergeClasses(
            'btn-primary',
            'btn-outline',
            isToday ? 'btn-active' : undefined
          )
        "
      >
        Today
      </Button>

      <DayOfWeekSelector v-model:value="date" />
    </div>

    <DateDisplay :date="date" />

    <EntryList :date="date" class="mt-4" />
  </div>
</template>

<script setup lang="ts">
import { isSameDay } from "date-fns";
import Button from "../Button.vue";
import DateDisplay from "./DateDisplay.vue";
import DayOfWeekSelector from "./DayOfWeekSelector.vue";
import EntryList from "./EntryList.vue";

const date = ref(new Date());

const isToday = computed(() => isSameDay(date.value, new Date()));
</script>
