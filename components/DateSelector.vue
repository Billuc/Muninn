<template>
  <Input
    :label="props.label"
    type="date"
    pattern="\d{4}-\d{2}-\d{2}"
    @update:value="onChange"
    :value="valueAsString"
    input-class="input input-primary input-sm"
  />
</template>

<script setup lang="ts">
import { format, parse } from "date-fns";
import Input from "./Input.vue";

interface DateSelectorProps {
  value: Date;
  label?: string;
}

const props = defineProps<DateSelectorProps>();
const emit = defineEmits(["update:value"]);

const valueAsString = computed(() => format(props.value, "yyyy-MM-dd"));

function onChange(newValue: string) {
  const newDateValue = parse(newValue, "yyyy-MM-dd", new Date());

  if (!isNaN(newDateValue.valueOf())) emit("update:value", newDateValue);
}
</script>
