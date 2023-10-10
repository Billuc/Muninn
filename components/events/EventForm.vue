<template>
  <Form ref="form">
    <InputField
      label="Event Name"
      placeholder="Enter name..."
      :value="props.title"
      :icon="faFont"
      @update:value="setTitle"
      :rules="[(v) => !!v]"
    />
    <InputField
      type="date"
      label="Event Date"
      placeholder="Enter date..."
      :value="date"
      :icon="faCalendar"
      @update:value="setDate"
      :rules="[(v) => !!v]"
    />
    <InputField
      type="time"
      label="Event Time"
      placeholder="Enter time..."
      :value="time"
      :icon="faClock"
      @update:value="setTime"
      :rules="[(v) => !!v]"
    />
    <DurationField
      label="Event Duration"
      :icon="faClockRotateLeft"
      :hours="props.hours"
      :minutes="props.minutes"
      @update:hours="setHours"
      @update:minutes="setMinutes"
    />
    <SelectField
      label="Frequency"
      :icon="faRepeat"
      :options="frequencyOptions"
      :value="frequency"
      @update:value="setFrequency"
      :rules="[(v) => !!v]"
    />
    <TagSelecter
      :tags="store.tagArray"
      :selected="props.tagId"
      @update:selected="setTagId"
      clearable
    />
  </Form>
</template>

<script setup lang="ts">
import { Frequency } from "~/models/Event";
import { useEventStore } from "~/stores/eventStore";
import _ from "lodash";
import {
  faCalendar,
  faClock,
  faClockRotateLeft,
  faFont,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import TagSelecter from "../TagSelecter.vue";
import Form from "../Form.vue";
import InputField from "../InputField.vue";
import SelectField from "../SelectField.vue";
import DurationField from "../DurationField.vue";

interface EventFormProps {
  title: string;
  date: string;
  time: string;
  hours: number;
  minutes: number;
  frequency: Frequency;
  tagId: number;
}

const props = defineProps<EventFormProps>();
const emit = defineEmits([
  "update:title",
  "update:date",
  "update:time",
  "update:hours",
  "update:minutes",
  "update:frequency",
  "update:tagId",
]);
const store = useEventStore();
const form = ref<InstanceType<typeof Form> | null>(null);

const frequencyOptions = Object.entries(Frequency).map(([text, freq]) => ({
  text: text,
  value: freq,
}));

const setTitle = (v: string) => emit("update:title", v);
const setDate = (v: string) => emit("update:date", v);
const setTime = (v: string) => emit("update:time", v);
const setHours = (v: number) => emit("update:hours", v);
const setMinutes = (v: number) => emit("update:minutes", v);
const setFrequency = (v: Frequency) => emit("update:frequency", v);
const setTagId = (v: number) => emit("update:tagId", v);

const validate = () => form.value?.validate();
defineExpose({ validate });
</script>
