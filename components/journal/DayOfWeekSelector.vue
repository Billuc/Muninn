<template>
  <div>
    <button
      v-for="(day, index) in daysOfWeek"
      :key="day + '-selector'"
      :class="
        mergeClasses(
          'btn',
          'btn-circle',
          'btn-outline',
          'btn-sm',
          'btn-primary',
          'mx-1',
          index == currentDayOfWeek ? 'btn-active' : undefined
        )
      "
      @click="() => onClick(index)"
    >
      {{ day }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { addDays } from "date-fns";

interface DayOfWeekSelectorProps {
  value: Date;
}

const props = defineProps<DayOfWeekSelectorProps>();
const emit = defineEmits(["input"]);

const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
const { value } = toRefs(props);
const currentDayOfWeek = computed(() => (value.value.getDay() + 6) % 7);

function onClick(newDayOfWeek: number) {
  const newValue = addDays(value.value, newDayOfWeek - currentDayOfWeek.value);
  emit("input", newValue);
}
</script>
