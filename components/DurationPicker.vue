<template>
  <Dropdown :label-class="props.labelClass">
    <template #label>
      <span>{{ durationLabel }}</span>
    </template>

    <template #content>
      <div class="grid grid-cols-2 gap-2">
        <DropdownList
          :elements="hourElements"
          :selected="props.hours"
          @select="onSelectHour"
        />
        <DropdownList
          :elements="minuteElements"
          :selected="props.minutes"
          @select="onSelectMinute"
        />
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import Dropdown from "./Dropdown.vue";
import DropdownList from "./DropdownList.vue";

interface DurationPickerProps {
  hours?: number;
  minutes?: number;
  labelClass: string;
}

const props = defineProps<DurationPickerProps>();
const emit = defineEmits(["update:hours", "update:minutes"]);

const hourElements = [...Array(24)].map((v, i) => ({
  text: ("00" + i).slice(-2),
  value: i,
}));
const minuteElements = [...Array(12)].map((v, i) => ({
  text: ("00" + 5 * i).slice(-2),
  value: 5 * i,
}));

const durationLabel = computed(
  () =>
    (props.hours === undefined ? "--" : ("00" + props.hours).slice(-2)) +
    ":" +
    (props.minutes === undefined ? "--" : ("00" + props.minutes).slice(-2))
);

const onSelectHour = (hour: number) => emit("update:hours", hour);
const onSelectMinute = (minute: number) => emit("update:minutes", minute);
</script>
