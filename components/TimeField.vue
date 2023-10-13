<template>
  <Field
    :icon="props.icon"
    :clearable="props.clearable"
    :label="props.label"
    :value="timeValue"
    @clear="clear"
    :rules="rules"
  >
    <template #input="{ inputClass }">
      <TimePicker
        :hours="props.hours"
        :minutes="props.minutes"
        :label-class="inputClass"
        class="flex-shrink w-full"
        @update:hours="onUpdateHours"
        @update:minutes="onUpdateMinutes"
      />
    </template>
  </Field>
</template>

<script setup lang="ts">
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Field from "./Field.vue";
import TimePicker from "./TimePicker.vue";

interface TimeFieldProps {
  label?: string;
  clearable?: boolean;
  icon?: IconDefinition;
  hours?: number;
  minutes?: number;
  required?: boolean;
}

const props = defineProps<TimeFieldProps>();
const emit = defineEmits(["clear", "update:hours", "update:minutes"]);

const clear = () => emit("clear");
const onUpdateHours = (hour: number) => emit("update:hours", hour);
const onUpdateMinutes = (minute: number) => emit("update:minutes", minute);

const timeValue = computed(
  () =>
    (props.hours === undefined ? "--" : ("00" + props.hours).slice(-2)) +
    ":" +
    (props.minutes === undefined ? "--" : ("00" + props.minutes).slice(-2))
);

const TIME_REGEX = new RegExp("[0-9]{2}:[0-9]{2}");
const rules = props.required ? [(v: string) => TIME_REGEX.test(v)] : [];
</script>
