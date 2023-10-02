<template>
  <SelectDropdown
    :options="yearOptions"
    :value="props.year.toString()"
    label-class="font-semibold"
    @update:value="selectYear"
  >
    <template #option="{ option, onSelect, selected }">
      <div @click="onSelect">
        <div
          :class="
            mergeClasses(
              'py-2',
              'font-semibold',
              'bg-base-100',
              'hover:bg-base-300',
              'mx-auto',
              'w-20',
              'drop-shadow-xl',
              'border-0',
              'text-center',
              'rounded-box',
              'mb-1',
              selected ? 'selected' : undefined
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
import SelectDropdown from "./SelectDropdown.vue";
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
