<template>
  <input
    type="checkbox"
    class="checkbox"
    :checked="props.value"
    @input="onInput"
    ref="checkbox"
  />
</template>

<script setup lang="ts">
interface CheckboxProps {
  value: boolean;
}

var props = defineProps<CheckboxProps>();
var emit = defineEmits(["input"]);
var checkbox = ref(null);

function onInput(ev: any) {
  emit("input", ev.target.checked);
}

const reset = () => {
  (checkbox.value as unknown as HTMLInputElement).checked = props.value;
};
defineExpose({ reset });
</script>
