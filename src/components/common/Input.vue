<script setup lang="ts">
interface InputProps {
  modelValue: string | number | null;
  label: string;
}

const props = defineProps<InputProps>();
const emit = defineEmits(["update:model-value"]);

const onUpdate = (v: string | number | null) => emit("update:model-value", v);
</script>

<template>
  <QInput
    filled
    dense
    hide-bottom-space
    :label="props.label"
    :model-value="props.modelValue"
    @update:model-value="onUpdate"
  />
</template>
