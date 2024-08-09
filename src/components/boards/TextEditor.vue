<script setup lang="ts">
interface TextEditorProps {
  modelValue: string;
  placeholder?: string;
}

const props = defineProps<TextEditorProps>();
const emit = defineEmits(["update:model-value"]);

function onTextChange(ev: any) {
  emit("update:model-value", ev.target.textContent);
}
</script>

<template>
  <div
    contenteditable="true"
    v-text="props.modelValue"
    @input="onTextChange"
    :data-placeholder="props.placeholder"
  />
</template>

<style>
div[contenteditable="true"]:empty:not(:focus):before {
  opacity: 0.5;
  content: attr(data-placeholder);
  pointer-events: none;
}
</style>
