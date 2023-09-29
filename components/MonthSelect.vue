<template>
  <SelectDropdown
    :options="monthOptions"
    :value="props.month.toString()"
    @update:value="selectMonth"
  >
    <template #option="{ option, onSelect, selected }">
      <div :class="mergeClasses('bg-base-300')" @click="onSelect">
        <div
          :class="
            mergeClasses(
              'py-2',
              'font-semibold',
              'bg-base-200',
              'hover:bg-base-300',
              'mx-auto',
              'w-40',
              'drop-shadow-xl',
              'border-0',
              'text-center',
              'rounded-box',
              'mb-1'
            )
          "
        >
          {{ option.text }}
        </div>
      </div>
    </template>
  </SelectDropdown>
</template>

<script setup lang="ts">
import { eachMonthOfInterval, endOfYear, format, startOfYear } from "date-fns";
import SelectDropdown from "./SelectDropdown.vue";

interface MonthSelectProps {
  month: number;
}

const props = defineProps<MonthSelectProps>();
const emit = defineEmits(["update:month"]);

const monthOptions = eachMonthOfInterval({
  start: startOfYear(new Date()),
  end: endOfYear(new Date()),
}).map((d) => ({ text: format(d, "MMMM"), value: d.getMonth().toString() }));

const selectMonth = (newMonth: string) =>
  emit("update:month", Number(newMonth));
</script>
