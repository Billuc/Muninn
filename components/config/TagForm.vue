<template>
  <div class="form-control gap-y-2">
    <InputAlt
      label="Tag name"
      placeholder="Enter name..."
      :icon="faFont"
      :value="props.title"
      @input="setTitle"
    />
    <TagColorInput
      :disabled-colors="props.disabledColors"
      :value="props.color"
      @input="setColor"
    />
    <IconInput :icon="props.icon" @input="setIcon" />
  </div>
</template>

<script setup lang="ts">
import { TagColor } from "~/models/Tag";
import InputAlt from "../InputAlt.vue";
import { faFont } from "@fortawesome/free-solid-svg-icons";
import TagColorInput from "./TagColorInput.vue";
import IconInput from "../IconInput.vue";

interface TagFormProps {
  title: string;
  color: TagColor;
  icon: string[];
  disabledColors: TagColor[];
}

const props = defineProps<TagFormProps>();
const emit = defineEmits(["update:title", "update:color", "update:icon"]);

const setTitle = (newTitle: string) => emit("update:title", newTitle);
const setColor = (newColor: TagColor) => emit("update:color", newColor);
const setIcon = (newIcon: string[]) => emit("update:icon", newIcon);
</script>
