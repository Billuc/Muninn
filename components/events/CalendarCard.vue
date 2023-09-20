<template>
  <div>
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
</template>

<script setup lang="ts">
import { addMonths } from "date-fns";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarMonthView from "./CalendarMonthView.vue";

interface CalendarCardProps {
  date: Date;
}

const props = defineProps<CalendarCardProps>();
const emit = defineEmits(["update:date"]);

const previousMonth = () => emit("update:date", addMonths(props.date, -1));
const nextMonth = () => emit("update:date", addMonths(props.date, 1));
const selectDate = (newDate: Date) => emit("update:date", newDate);
</script>
