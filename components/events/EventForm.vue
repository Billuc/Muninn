<template>
  <LayoutLoading v-if="pending"/>
  <Form ref="form" v-else>
    <InputField
      label="Event Name"
      placeholder="Enter name..."
      :value="props.title"
      :icon="faFont"
      @update:value="setTitle"
      :rules="[(v) => !!v]"
    />
    <DateField
      label="Event Date"
      placeholder="Enter date..."
      :value="date"
      :icon="faCalendar"
      @update:value="setDate"
      required
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
      :value="props.frequency"
      @update:value="setFrequency"
      :rules="[(v) => !!v]"
    />
    <InputField
      type="number"
      label="Frequency 'X'"
      placeholder="Enter name..."
      :value="String(props.frequencyMultiplier)"
      :icon="faHashtag"
      @update:value="setFrequencyMultiplier"
      :rules="[(v) => !!v]"
      v-if="props.frequency !== 'once'"
    />
    <TagSelecter
      :tags="tags!"
      :selected="props.tagId"
      @update:selected="setTagId"
      clearable
    />
    <InputField
      label="Event Description"
      placeholder="Enter description..."
      :value="description"
      :icon="faFont"
      @update:value="setDescription"
      clearable
      @clear="() => setDescription('')"
    />
  </Form>
</template>

<script setup lang="ts">
import _ from "lodash";
import {
  faCalendar,
  faClock,
  faClockRotateLeft,
  faFont,
  faHashtag,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { Frequency, FrequencyMapper } from "~/data/models/Event";
import { type ID } from "~/data/models/ID";
import type { Form } from "#build/components";
import { EventTagService } from "~/data/services/eventTagService";

interface EventFormProps {
  title: string;
  date: Date;
  time: [number?, number?];
  duration: [number?, number?];
  frequency: Frequency;
  frequencyMultiplier: number;
  tagId: ID;
  description: string;
}

const props = defineProps<EventFormProps>();
const emit = defineEmits([
  "update:title",
  "update:date",
  "update:time",
  "update:duration",
  "update:frequency",
  "update:frequency-multiplier",
  "update:tagId",
  "update:description",
]);
const service = useService(EventTagService);

const form = ref<InstanceType<typeof Form> | null>(null);
const frequencyOptions = Object.values(Frequency).map((freq) => ({
  text: FrequencyMapper[freq],
  value: freq,
}));

const { pending, data: tags } = useLazyAsyncData("event-tags", () => service.getAll());

const setTitle = (v: string) => emit("update:title", v);
const setDate = (v: Date) => emit("update:date", v);
const setTime = (v: [number?, number?]) => emit("update:time", v);
const setDuration = (v: [number?, number?]) => emit("update:duration", v);
const setFrequency = (v: Frequency) => emit("update:frequency", v);
const setFrequencyMultiplier = (v: string) =>
  emit("update:frequency-multiplier", Number(v));
const setTagId = (v: ID) => emit("update:tagId", v);
const setDescription = (v: string) => emit("update:description", v);

const validate = () => form.value?.validate();
defineExpose({ validate });
</script>
