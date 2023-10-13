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
    <TimeField
      label="Event Time"
      :icon="faClock"
      :hours="props.time[0]"
      :minutes="props.time[1]"
      @update:hours="(v) => setTime([v, props.time[1]])"
      @update:minutes="(v) => setTime([props.time[0], v])"
      required
    />
    <DurationField
      label="Event Duration"
      :icon="faClockRotateLeft"
      :hours="props.duration[0]"
      :minutes="props.duration[1]"
      @update:hours="(v) => setDuration([v, props.duration[1]])"
      @update:minutes="(v) => setDuration([props.duration[0], v])"
      required
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
import TimeField from "../TimeField.vue";

interface EventFormProps {
  title: string;
  date: string;
  time: [number?, number?];
  duration: [number?, number?];
  frequency: Frequency;
  tagId: number;
}

const props = defineProps<EventFormProps>();
const emit = defineEmits([
  "update:title",
  "update:date",
  "update:time",
  "update:duration",
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
const setTime = (v: [number?, number?]) => emit("update:time", v);
const setDuration = (v: [number?, number?]) => emit("update:duration", v);
const setFrequency = (v: Frequency) => emit("update:frequency", v);
const setTagId = (v: number) => emit("update:tagId", v);

const validate = () => form.value?.validate();
defineExpose({ validate });
</script>
