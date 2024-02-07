<script setup lang="ts">
import { computed } from "vue";

interface NoteEditorProps {
  modelValue: string;
  readonly?: boolean;
}

const props = defineProps<NoteEditorProps>();
const emit = defineEmits(["update:model-value"]);

const toolbarCommands = computed(() =>
  props.readonly
    ? []
    : [
        ["left", "center", "right", "justify"],
        ["bold", "italic", "underline", "strike"],
        ["quote", "unordered", "ordered", "outdent", "indent"],
        ["undo", "redo"],
      ]
);

const onUpdate = (v: string) => emit("update:model-value", v);
</script>

<template>
  <QEditor
    :model-value="props.modelValue"
    @update:model-value="onUpdate"
    flat
    toolbar-bg="primary"
    toolbar-toggle-color="white"
    content-class="bg-background montserrat"
    :toolbar="toolbarCommands"
    :readonly="props.readonly"
    :class="{ 'shadow-2': !props.readonly }"
  />
</template>
