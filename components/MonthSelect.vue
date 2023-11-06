<template>
  <SelectDropdown
    :options="monthOptions"
    :value="props.month.toString()"
    label-class="font-semibold"
    @update:value="selectMonth"
  >
  </SelectDropdown>
</template>

<script setup lang="ts">
import { eachMonthOfInterval, endOfYear, format, startOfYear } from "date-fns";

interface MonthSelectProps {
  month: number;
  compact?: boolean;
}

const props = defineProps<MonthSelectProps>();
const emit = defineEmits(["update:month"]);

const monthOptions = eachMonthOfInterval({
  start: startOfYear(new Date()),
  end: endOfYear(new Date()),
}).map((d) => ({ text: format(d, props.compact ? "MMM" : "MMMM"), value: d.getMonth().toString() }));

const selectMonth = (newMonth: string) =>
  emit("update:month", Number(newMonth));
</script>
