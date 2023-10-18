<template>
  <input
    type="checkbox"
    class="checkbox"
    :checked="props.value"
    @input="onInput"
    ref="checkbox"
    :disabled="props.disabled"
  />
</template>

<script setup lang="ts">
interface CheckboxProps {
  value: boolean;
  disabled?: boolean;
}

var props = defineProps<CheckboxProps>();
var emit = defineEmits(["update:value"]);
var checkbox = ref<HTMLInputElement | null>(null);

const onInput = (ev: any) => emit("update:value", ev.target.checked);

const reset = () => {
  if (checkbox.value) checkbox.value.checked = props.value;
};
defineExpose({ reset });
</script>
