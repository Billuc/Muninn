<script setup lang="ts">
interface NoteEditorProps {
  modelValue: string;
}

const props = defineProps<NoteEditorProps>();
const emit = defineEmits(["update:model-value"]);

const onUpdate = (v: string) => emit("update:model-value", v);
</script>

<template>
  <QEditor
    :model-value="props.modelValue"
    @update:model-value="onUpdate"
    flat
    toolbar-bg="secondary"
    :toolbar="[
        ['left', 'center', 'right', 'justify'], 
        ['bold', 'italic', 'underline', 'strike'], 
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['undo', 'redo'],
    ]"
  />
</template>