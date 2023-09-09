<template>
  <input
    type="date"
    class="input input-sm input-bordered focus:outline-0"
    pattern="\d{4}-\d{2}-\d{2}"
    :value="valueAsString"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { format } from "date-fns";

interface DateSelectorProps {
  value: Date;
}

const props = defineProps<DateSelectorProps>();
const emit = defineEmits(["input"]);

const { value } = toRefs(props);
const valueAsString = computed(() => format(value.value, "yyyy-MM-dd"));

function onChange(ev: any) {
  const newValue = ev.target?.value;
  const newDateValue = new Date(newValue);

  if (!isNaN(newDateValue.valueOf())) emit("input", newDateValue);
}
</script>
