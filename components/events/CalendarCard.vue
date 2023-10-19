<template>
  <div>
    <CalendarHeader
      :date="props.date"
      @previousMonth="previousMonth"
      @nextMonth="nextMonth"
      @select-month="selectMonth"
      @select-year="selectYear"
      class="px-4"
    />
    <CalendarMonthView
      :date="props.date"
      :tag-filter="props.tagFilter"
      class="pt-4"
      @selectDate="selectDate"
    ></CalendarMonthView>
  </div>
</template>

<script setup lang="ts">
import { addMonths, setMonth, setYear } from "date-fns";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarMonthView from "./CalendarMonthView.vue";
import { ID } from "~/models/ID";

interface CalendarCardProps {
  date: Date;
  tagFilter?: ID;
}

const props = defineProps<CalendarCardProps>();
const emit = defineEmits(["update:date"]);

const previousMonth = () => emit("update:date", addMonths(props.date, -1));
const nextMonth = () => emit("update:date", addMonths(props.date, 1));
const selectMonth = (newMonth: number) => emit("update:date", setMonth(props.date, newMonth));
const selectYear = (newYear: number) => emit("update:date", setYear(props.date, newYear));
const selectDate = (newDate: Date) => emit("update:date", newDate);
</script>
