<template>
  <div :class="mergeClasses('grid', 'grid-cols-7', 'gap-y-1')">
    <div
      class="text-base font-medium text-center"
      v-for="dayLabel in dayLabels"
    >
      {{ dayLabel }}
    </div>

    <CalendarDayButton
      v-for="day in daysOfMonth"
      :key="'day-' + day"
      :day="day"
      :date="props.date"
      :tag-filter="props.tagFilter"
      @click="() => selectDate(day)"
    />
  </div>
</template>

<script setup lang="ts">
import {
  addDays,
  eachDayOfInterval,
  format,
  lastDayOfMonth,
  lastDayOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import CalendarDayButton from "./CalendarDayButton.vue";
import { ID } from "~/models/ID";

interface CalendarMonthViewProps {
  date: Date;
  tagFilter?: ID;
  compact?: boolean;
}

const props = defineProps<CalendarMonthViewProps>();
const emit = defineEmits(["selectDate"]);

const dayLabels = eachDayOfInterval({
  start: startOfWeek(props.date, { weekStartsOn: 1 }),
  end: addDays(startOfWeek(props.date, { weekStartsOn: 1 }), 6),
}).map((day) => format(day, props.compact ? "EEEEE" : "EEE"));
const daysOfMonth = computed(() =>
  eachDayOfInterval({
    start: startOfWeek(startOfMonth(props.date), { weekStartsOn: 1 }),
    end: lastDayOfWeek(lastDayOfMonth(props.date), { weekStartsOn: 1 }),
  })
);

const selectDate = (day: Date) => emit("selectDate", day);
</script>
