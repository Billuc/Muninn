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
    <SelectAlt
      label="Tag"
      :icon="faTag"
      :options="tagOptions"
      :value="String(tagId)"
      @update:value="setTagId"
      @clear="() => setTagId('-1')"
      clearable
    >
      <template #selected="{ selected }">
        <TagVue
          :color="selected ? getTag(selected.value)?.color : undefined"
          :icon="selected ? getTag(selected.value)?.icon : undefined"
          :text="selected ? getTag(selected.value)?.title : undefined"
          class="w-full !btn-xs"
        />
      </template>
      <template #option="{ option, onSelect }">
        <TagVue
          :color="getTag(option.value)?.color"
          :icon="getTag(option.value)?.icon"
          :text="getTag(option.value)?.title"
          @click="onSelect"
          class="w-full hover:scale-105"
        />
      </template>
    </SelectAlt>
  </div>
</template>

<script setup lang="ts">
import { Frequency } from "~/models/Event";
import { Tag, TagOrder } from "~/models/Tag";
import { useEventStore } from "~/stores/eventStore";
import _ from "lodash";
import {
  faCalendar,
  faClock,
  faClockRotateLeft,
  faFont,
  faRepeat,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import TagVue from "../Tag.vue";

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
const tagOptions = _(store.tagArray as Tag[])
  .chain()
  .sortBy((t) => TagOrder.get(t.color))
  .map((t) => ({
    text: t.title,
    value: String(t.id),
  }))
  .value();
const getTag = (tagId: string) => store.tags.get(Number(tagId));

const setTitle = (v: string) => emit("update:title", v);
const setDate = (v: string) => emit("update:date", v);
const setTime = (v: string) => emit("update:time", v);
const setDuration = (v: string) => emit("update:duration", v);
const setFrequency = (v: Frequency) => emit("update:frequency", v);
const setTagId = (v: string) => emit("update:tagId", Number(v));
</script>
