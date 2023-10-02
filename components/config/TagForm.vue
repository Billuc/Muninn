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
    <TagColorInput
      :disabled-colors="props.disabledColors"
      :value="props.color"
      @update:value="setColor"
      required
    />
    <IconInput :icon="props.icon" @update:icon="setIcon" />
  </Form>
</template>

<script setup lang="ts">
import { TagColor } from "~/models/Tag";
import { faFont } from "@fortawesome/free-solid-svg-icons";
import TagColorInput from "./TagColorInput.vue";
import IconInput from "../IconInput.vue";
import Form from "../Form.vue";
import InputField from "../InputField.vue";

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
