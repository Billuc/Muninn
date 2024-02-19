<script setup lang="ts">
import Input from "@/components/common/Input.vue";
import { required } from "@/utils/rules";
import NoteTagSelect from "./tags/NoteTagSelect.vue";
import { ID } from "@/data/models/ID";

interface NoteFormProps {
  title: string;
  tagId: ID;
}

const props = defineProps<NoteFormProps>();
const emit = defineEmits(["update:title", "update:tag-id"]);

const onUpdateTitle = (v: string) => emit("update:title", v);
const onUpdateTagId = (v: ID) => emit("update:tag-id", v);
</script>

<template>
  <div>
    <Input
      :model-value="props.title"
      @update:model-value="onUpdateTitle"
      label="Note name"
      :rules="[required]"
    />
    <NoteTagSelect
      :model-value="props.tagId"
      @update:model-value="onUpdateTagId"
      label="Note tag"
    />
  </div>
</template>
