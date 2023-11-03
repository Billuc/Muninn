<template>
  <Form ref="form">
    <InputField
      label="Tag name"
      placeholder="Enter name..."
      :icon="faFont"
      :value="props.title"
      @update:value="setTitle"
      :rules="[(v) => !!v]"
    />
    <ConfigTagColorInput
      :disabled-colors="props.disabledColors"
      :value="props.color"
      @update:value="setColor"
      required
    />
    <IconInput :icon="props.icon" @update:icon="setIcon" />
  </Form>
</template>

<script setup lang="ts">
import type { Form } from "#build/components";
import { faFont } from "@fortawesome/free-solid-svg-icons";
import { TagColor } from "~/data/models/Tag";

interface TagFormProps {
  title: string;
  color: TagColor;
  icon: string[];
  disabledColors: TagColor[];
}

const props = defineProps<TagFormProps>();
const emit = defineEmits(["update:title", "update:color", "update:icon"]);
const form = ref<InstanceType<typeof Form> | null>(null);

const setTitle = (newTitle: string) => emit("update:title", newTitle);
const setColor = (newColor: TagColor) => emit("update:color", newColor);
const setIcon = (newIcon: string[]) => emit("update:icon", newIcon);

const validate = () => form.value?.validate();
defineExpose({ validate });
</script>
