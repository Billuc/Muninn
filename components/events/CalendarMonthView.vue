<template>
  <div :class="mergeClasses('grid', 'grid-cols-7', 'gap-y-1')">
    <div
      class="text-base font-medium text-center"
      v-for="dayLabel in dayLabels"
    >
      {{ dayLabel }}
    </div>

    <Button
      v-for="day in daysOfMonth"
      @click="() => selectDate(day)"
      :class="
        mergeClasses(
          'btn-circle',
          !isSameMonth(day, props.date) ? 'opacity-50' : undefined,
          isSameDay(day, props.date) ? 'btn-accent' : 'btn-ghost'
        )
      "
    >
      {{ day.getDate() }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import {
  addDays,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
  lastDayOfMonth,
  lastDayOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import Button from "../Button.vue";

interface CalendarMonthViewProps {
  date: Date;
}

const props = defineProps<CalendarMonthViewProps>();
const emit = defineEmits(['selectDate'])

const dayLabels = eachDayOfInterval({
  start: startOfWeek(props.date, { weekStartsOn: 1 }),
  end: addDays(startOfWeek(props.date, { weekStartsOn: 1 }), 6),
}).map((day) => format(day, "EEE"));
const daysOfMonth = computed(() =>
  eachDayOfInterval({
    start: startOfWeek(startOfMonth(props.date), { weekStartsOn: 1 }),
    end: lastDayOfWeek(lastDayOfMonth(props.date), { weekStartsOn: 1 }),
  })
);

const selectDate = (day: Date) => emit("selectDate", day);
</script>
