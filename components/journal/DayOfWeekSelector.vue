<template>
  <div class="flex gap-2">
    <button
      v-for="day in daysOfWeek"
      :key="getDay(day) + '-selector'"
      :class="
        mergeClasses(
          'btn',
          'btn-outline',
          'btn-primary',
          isSameDay(day, props.value) ? 'btn-active' : undefined,
          'flex',
          'flex-col',
          'flex-nowrap',
          'h-auto',
          'gap-0',
          'w-10'
        )
      "
      @click="() => onClick(day)"
    >
      <div class="capitalize text-sm font-light leading-3">
        {{ getDay(day) }}
      </div>
      <div class="text-base font-semibold leading-4">{{ getDate(day) }}</div>
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  addDays,
  eachDayOfInterval,
  format,
  startOfWeek,
  isSameDay,
} from "date-fns";

interface DayOfWeekSelectorProps {
  value: Date;
}

const props = defineProps<DayOfWeekSelectorProps>();
const emit = defineEmits(["update:value"]);

const daysOfWeek = eachDayOfInterval({
  start: startOfWeek(props.value, { weekStartsOn: 1 }),
  end: addDays(startOfWeek(props.value, { weekStartsOn: 1 }), 6),
});

const getDay = (date: Date) => format(date, "EEE");
const getDate = (date: Date) => date.getDate();

const onClick = (newValue: Date) => emit("update:value", newValue);
</script>
