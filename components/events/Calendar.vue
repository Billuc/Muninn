<template>
  <div className="card bg-accent-focus w-96 shadow-xl overflow-hidden">
    <div class="p-5 md:p-8">
      <CalendarHeader
        :date="date"
        @previousMonth="previousMonth"
        @nextMonth="nextMonth"
        class="px-4"
      />
      <CalendarMonthView
        :date="date"
        class="pt-12"
        @selectDate="selectDate"
      ></CalendarMonthView>
    </div>
    <div class="card-body bg-accent p-5 md:p-8"></div>
  </div>
</template>

<script setup lang="ts">
import { addMonths } from "date-fns";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarMonthView from "./CalendarMonthView.vue";

const date = ref(new Date());

const previousMonth = () => (date.value = addMonths(date.value, -1));
const nextMonth = () => (date.value = addMonths(date.value, 1));
const selectDate = (newDate: Date) => (date.value = newDate);
</script>
