<script setup lang="ts">
import Input from "@/components/common/Input.vue";
import { required } from "@/utils/rules";
import { ID } from "@/data/models/ID";
import BoardTagSelect from "./tags/BoardTagSelect.vue";

interface BoardFormProps {
  title: string;
  tagId: ID;
}

const props = defineProps<BoardFormProps>();
const emit = defineEmits(["update:title", "update:tag-id"]);

const onUpdateTitle = (v: string) => emit("update:title", v);
const onUpdateTagId = (v: ID) => emit("update:tag-id", v);
</script>

<template>
  <div>
    <Input
      :model-value="props.title"
      @update:model-value="onUpdateTitle"
      label="Board name"
      :rules="[required]"
    />
    <BoardTagSelect
      :model-value="props.tagId"
      @update:model-value="onUpdateTagId"
      label="Board tag"
    />
  </div>
</template>
