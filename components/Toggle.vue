<template>
  <input
    type="checkbox"
    class="toggle"
    :checked="props.value"
    @input="onInput"
    ref="toggle"
    :disabled="props.disabled"
  />
</template>

<script setup lang="ts">
interface ToggleProps {
  value: boolean;
  disabled?: boolean;
}

const props = defineProps<ToggleProps>();
var emit = defineEmits(["update:value"]);
var toggle = ref<HTMLInputElement | null>(null);

function onInput(ev: any) {
  emit("update:value", ev.target.checked);
}

const reset = () => {
  if (toggle.value) toggle.value.checked = props.value;
};
defineExpose({ reset });
</script>
