<template>
  <div :class="mergeClasses('relative', 'max-w-sm', 'md:max-w-md')">
    <div
      :class="
        mergeClasses(
          'card',
          'bg-primary',
          'text-primary-content',
          'shadow-xl',
          'overflow-hidden'
        )
      "
    >
      <div class="px-4 py-4 md:px-8 md:py-6">
        <CalendarHeader
          :date="date"
          @previousMonth="previousMonth"
          @nextMonth="nextMonth"
          class="px-4"
        />
        <CalendarMonthView
          :date="date"
          class="pt-4"
          @selectDate="selectDate"
        ></CalendarMonthView>
      </div>
      <div
        :class="
          mergeClasses(
            'bg-secondary',
            'text-secondary-content',
            'px-6',
            'py-4',
            'md:px-14',
            'md:py-6'
          )
        "
      >
        <CalendarEvents :date="date"></CalendarEvents>
      </div>
    </div>

    <CreateEvent />
  </div>
</template>

<script setup lang="ts">
import { addMonths } from "date-fns";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarMonthView from "./CalendarMonthView.vue";
import CalendarEvents from "./CalendarEvents.vue";
import CreateEvent from "./CreateEvent.vue";

const date = ref(new Date());

const previousMonth = () => (date.value = addMonths(date.value, -1));
const nextMonth = () => (date.value = addMonths(date.value, 1));
const selectDate = (newDate: Date) => (date.value = newDate);
</script>
