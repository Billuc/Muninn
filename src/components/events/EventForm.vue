<script setup lang="ts">
import Input from "@/components/common/Input.vue";
import DateTimeInput from "@/components/common/DateTimeInput.vue";
import EventTagSelect from "@/components/events/tags/EventTagSelect.vue";
import { required } from "@/utils/rules";
import { Tag } from "@/data/models/Tag";

interface EventFormProps {
  title: string;
  tag: Tag | null;
  start: Date;
  end: Date | null;
  description: string;
}

const props = defineProps<EventFormProps>();
const emit = defineEmits([
  "update:title",
  "update:tag",
  "update:start",
  "update:end",
  "update:description",
]);

const onUpdateTitle = (v: string) => emit("update:title", v);
const onUpdateDescription = (v: string) => emit("update:description", v);
const onUpdateStart = (v: string) => emit("update:start", v);
const onUpdateEnd = (v: string) => emit("update:end", v);
const onUpdateTag = (v: Tag | null) => emit("update:tag", v);
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
      :model-value="props.tag"
      @update:model-value="onUpdateTag"
      label="Event tag"
    />
  </div>
</template>
