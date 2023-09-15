<template>
  <Input
    :label="props.label"
    type="text"
    :placeholder="props.placeholder"
    @change="onChange"
    :value="props.value"
  />
</template>

<script setup lang="ts">
import Input from './Input.vue';

interface TextInputProps {
  label?: string;
  value: string;
  inputClass?: string;
  placeholder?: string;
}

const props = defineProps<TextInputProps>();
const emit = defineEmits(["input"]);

function onChange(ev: any) {
  emit("input", ev.target.value);
}
</script>
