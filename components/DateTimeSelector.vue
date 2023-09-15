<template>
  <Input
    :label="props.label"
    type="datetime-local"
    pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}"
    @change="onChange"
    :value="valueAsString"
  />
</template>

<script setup lang="ts">
import { format, parse } from "date-fns";
import Input from "./Input.vue";

interface DateTimeSelectorProps {
  value: Date;
  label?: string;
}

const props = defineProps<DateTimeSelectorProps>();
const emit = defineEmits(["input"]);

const { value } = toRefs(props);
const valueAsString = computed(() => format(value.value, "yyyy-MM-dd'T'HH:mm"));

function onChange(ev: any) {
  const newValue = ev.target?.value;
  const newDateValue = parse(newValue, "yyyy-MM-dd'T'HH:mm", new Date());

  if (!isNaN(newDateValue.valueOf())) emit("input", newDateValue);
}
</script>
