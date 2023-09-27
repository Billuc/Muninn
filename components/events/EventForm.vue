<template>
  <div class="form-control gap-y-2">
    <InputAlt
      label="Event Name"
      placeholder="Enter name..."
      :value="props.title"
      :icon="faFont"
      @input="setTitle"
    />
    <InputAlt
      type="date"
      label="Event Date"
      placeholder="Enter name..."
      :value="date"
      :icon="faCalendar"
      @input="setDate"
    />
    <InputAlt
      type="time"
      label="Event Time"
      placeholder="Enter name..."
      :value="time"
      :icon="faClock"
      @input="setTime"
    />
    <InputAlt
      type="time"
      label="Event Duration"
      placeholder="Enter name..."
      :value="duration"
      :icon="faClockRotateLeft"
      @input="setDuration"
    />
    <SelectAlt
      label="Frequency"
      :icon="faRepeat"
      :options="frequencyOptions"
      :value="frequency"
      @update:value="setFrequency"
    />
    <TagSelecter
      :tags="store.tagArray"
      :selected="props.tagId"
      @update:selected="setTagId"
      clearable
    />
  </div>
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

interface EventFormProps {
  title: string;
  date: string;
  time: string;
  duration: string;
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

const frequencyOptions = Object.entries(Frequency).map(([text, freq]) => ({
  text: text,
  value: freq,
}));

const setTitle = (v: string) => emit("update:title", v);
const setDate = (v: string) => emit("update:date", v);
const setTime = (v: string) => emit("update:time", v);
const setDuration = (v: string) => emit("update:duration", v);
const setFrequency = (v: Frequency) => emit("update:frequency", v);
const setTagId = (v: number) => emit("update:tagId", v);
</script>
