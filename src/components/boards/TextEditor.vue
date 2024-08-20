<script setup lang="ts">
import _ from "lodash";

interface TextEditorProps {
  modelValue: string;
  placeholder?: string;
  debounce?: number;
}

const props = defineProps<TextEditorProps>();
const emit = defineEmits(["update:model-value"]);

const sendEvent = _.debounce(
  (v: string) => emit("update:model-value", v),
  props.debounce ?? 0
);

function onTextChange(ev: any) {
  sendEvent(ev.target.textContent);
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
