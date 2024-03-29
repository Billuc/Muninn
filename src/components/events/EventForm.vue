<script setup lang="ts">
import Input from "@/components/common/Input.vue";
import DateTimeInput from "@/components/common/DateTimeInput.vue";
import EventTagSelect from "@/components/events/tags/EventTagSelect.vue";
import { required } from "@/utils/rules";
import { Tag } from "@/data/models/Tag";
import { ID } from "@/data/models/ID";
import FrequencySelect from "./frequency/FrequencySelect.vue";
import { Frequency } from "@/data/models/Event";

interface EventFormProps {
  title: string;
  tagId: ID;
  start: Date;
  end: Date | null;
  description: string;
  frequency: Frequency;
  frequencyMultiplier: number;
}

const props = defineProps<EventFormProps>();
const emit = defineEmits([
  "update:title",
  "update:tag-id",
  "update:start",
  "update:end",
  "update:description",
  "update:frequency",
  "update:frequency-multiplier",
]);

const onUpdateTitle = (v: string) => emit("update:title", v);
const onUpdateDescription = (v: string) => emit("update:description", v);
const onUpdateStart = (v: string) => emit("update:start", v);
const onUpdateEnd = (v: string) => emit("update:end", v);
const onUpdateTagId = (v: Tag | null) => emit("update:tag-id", v);
const onUpdateFrequency = (v: Frequency) => emit("update:frequency", v);
const onUpdateFrequencyMultiplier = (v: number) =>
  emit("update:frequency-multiplier", v);
</script>

<template>
  <div>
    <Input
      :model-value="props.title"
      @update:model-value="onUpdateTitle"
      label="Event name"
      :rules="[required]"
    />
    <Input
      :model-value="props.description"
      @update:model-value="onUpdateDescription"
      label="Event description"
    />
    <DateTimeInput
      :model-value="props.start"
      @update:model-value="onUpdateStart"
      label="Event start"
      :rules="[required]"
    />
    <DateTimeInput
      :model-value="props.end"
      @update:model-value="onUpdateEnd"
      label="Event end"
      clearable
    />
    <EventTagSelect
      :model-value="props.tagId"
      @update:model-value="onUpdateTagId"
      label="Event tag"
    />
    <FrequencySelect
      :frequency="props.frequency"
      @update:frequency="onUpdateFrequency"
      :multiplier="props.frequencyMultiplier"
      @update:multiplier="onUpdateFrequencyMultiplier"
    />
  </div>
</template>
