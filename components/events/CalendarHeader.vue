<template>
  <div :class="mergeClasses('flex', 'items-center', 'justify-between')">
    <Button
      :icon="faAngleLeft"
      @click="prevMonth"
      class="btn-circle btn-ghost btn-xs"
    />

    <MonthSelect
      :month="props.date.getMonth()"
      :compact="props.compact"
      @update:month="selectMonth"
      class="!w-fit"
    />
    <YearSelect
      :year="props.date.getFullYear()"
      @update:year="selectYear"
      class="!w-fit"
    />

    <Button
      :icon="faAngleRight"
      @click="nextMonth"
      class="btn-circle btn-ghost btn-xs"
    />
  </div>
</template>

<script setup lang="ts">
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button.vue";
import MonthSelect from "../MonthSelect.vue";
import YearSelect from "../YearSelect.vue";

interface CalendarHeaderProps {
  date: Date;
  compact?: boolean;
}

const props = defineProps<CalendarHeaderProps>();
const emit = defineEmits([
  "nextMonth",
  "previousMonth",
  "selectMonth",
  "selectYear",
]);

const nextMonth = () => emit("nextMonth");
const prevMonth = () => emit("previousMonth");
const selectMonth = (newMonth: number) => emit("selectMonth", newMonth);
const selectYear = (newYear: number) => emit("selectYear", newYear);
</script>
