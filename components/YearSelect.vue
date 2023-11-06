<template>
  <SelectDropdown
    :options="yearOptions"
    :value="props.year.toString()"
    label-class="font-semibold"
    @update:value="selectYear"
  >
  </SelectDropdown>
</template>

<script setup lang="ts">
import _ from "lodash";

interface YearSelectProps {
  year: number;
}

const props = defineProps<YearSelectProps>();
const emit = defineEmits(["update:year"]);

const yearOptions = _.range(1970, 2100).map((y) => ({
  text: y.toString(),
  value: y.toString(),
}));

const selectYear = (newYear: string) => emit("update:year", Number(newYear));

onMounted(() => {
  const selectedEl = document.getElementsByClassName("selected")[0];
  selectedEl?.scrollIntoView();
});
</script>
