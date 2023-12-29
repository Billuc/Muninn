<script setup lang="ts">
import Input from "@/components/common/Input.vue";
import DateTimeInput from "@/components/common/DateTimeInput.vue";
import { required } from "@/utils/rules";

interface EventFormProps {
  title: string;
  tagId: string;
  start: Date;
  end: Date | null;
  description: string;
}

const props = defineProps<EventFormProps>();
const emit = defineEmits([
  "update:title",
  "update:tagId",
  "update:start",
  "update:end",
  "update:description",
]);

const onUpdateTitle = (v: string) => emit("update:title", v);
const onUpdateDescription = (v: string) => emit("update:description", v);
const onUpdateStart = (v: string) => emit("update:start", v);
const onUpdateEnd = (v: string) => emit("update:end", v);
const onUpdateTagId = (v: string) => emit("update:tagId", v);
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
    <Input
      :model-value="props.tagId"
      @update:model-value="onUpdateTagId"
      label="Event tag"
    />
  </div>
</template>
