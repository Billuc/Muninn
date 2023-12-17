<script setup lang="ts">
import Input from "@/components/common/Input.vue";
import { required } from "@/utils/rules";

interface NoteFormProps {
  title: string;
  tagId: string;
}

const props = defineProps<NoteFormProps>();
const emit = defineEmits(["update:title", "update:tagId"]);

const onUpdateTitle = (v: string) => emit("update:title", v);
const onUpdateTagId = (v: string) => emit("update:tagId", v);
</script>

<template>
  <div>
    <Input
      :model-value="props.title"
      @update:model-value="onUpdateTitle"
      label="Note name"
      :rules="[required]"
    />
    <!-- TODO : tagId input -->
  </div>
</template>
