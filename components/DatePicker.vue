<template>
  <Dropdown :label-class="props.labelClass">
    <template #label>
      <span>{{ dateLabel }}</span>
    </template>

    <template #content>
      <CalendarCard :date="props.value" @update:date="onSelectDate" compact />
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import Dropdown from "./Dropdown.vue";
import CalendarCard from "./events/CalendarCard.vue";

interface TimePickerProps {
  value: Date;
  labelClass?: string;
}

const props = defineProps<TimePickerProps>();
const emit = defineEmits(["update:value"]);

const dateLabel = computed(() => format(props.value, "dd/MM/yyyy"));

const onSelectDate = (date: Date) => emit("update:value", date);
</script>
