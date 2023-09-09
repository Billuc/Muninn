<template>
  <div class="form-control">
    <label class="cursor-pointer label">
      <span :class="mergeClasses('label-text', 'mr-2', props.labelClass)">{{
        props.label
      }}</span>
      <input
        type="checkbox"
        :class="mergeClasses('toggle', props.toggleClass)"
        :checked="props.value"
        @input="onInput"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
interface ToggleProps {
  toggleClass?: string;
  labelClass?: string;
  label?: string;
  value: boolean;
}

const props = defineProps<ToggleProps>();
const emit = defineEmits(["input"]);

function onInput(ev: any) {
  emit("input", ev.target.checked);
}
</script>
