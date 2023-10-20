<template>
  <div class="flex gap-2">
    <button :class="buttonClass" @click="onPrevious">
      <FontAwesomeIcon :icon="faChevronLeft" />
    </button>

    <button
      v-for="day in displayedDays"
      :key="getDay(day) + '-selector'"
      :class="
        mergeClasses(
          buttonClass,
          'btn-outline',
          isSameDay(day, props.value) ? 'btn-active' : undefined
        )
      "
      @click="() => onClick(day)"
    >
      <div class="capitalize text-sm font-light leading-3">
        {{ getDay(day) }}
      </div>
      <div class="text-base font-semibold leading-4">{{ getDate(day) }}</div>
    </button>

    <button :class="buttonClass" @click="onNext">
      <FontAwesomeIcon :icon="faChevronRight" />
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { addDays, eachDayOfInterval, format, isSameDay } from "date-fns";

interface DayOfWeekSelectorProps {
  value: Date;
}

const props = defineProps<DayOfWeekSelectorProps>();
const emit = defineEmits(["update:value"]);

const displayedDays = computed(() =>
  eachDayOfInterval({
    start: addDays(props.value, -2),
    end: addDays(props.value, 2),
  })
);

const getDay = (date: Date) => format(date, "EEE");
const getDate = (date: Date) => date.getDate();

const buttonClass = mergeClasses(
  "btn",
  "btn-primary",
  "flex",
  "flex-col",
  "flex-nowrap",
  "gap-0",
  "w-10",
  "h-12"
);

const onClick = (newValue: Date) => emit("update:value", newValue);
const onPrevious = () => emit("update:value", addDays(props.value, -3));
const onNext = () => emit("update:value", addDays(props.value, 3));
</script>
