<template>
  <div class="w-full">
    <InputLabel v-if="props.label" :label="props.label" />

    <select
      :class="
        mergeClasses(
          'select',
          'select-bordered',
          'w-full',
          'hover:brightness-95',
          'focus:brightness-100',
          'transition-all',
          'duration-200',
          props.class
        )
      "
      :value="props.value"
      @input="onInput"
    >
      <option disabled selected>{{ props.placeholder ?? "Pick one" }}</option>
      <option v-for="opt in props.options" :value="opt">
        <div>{{ opt }}</div>
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import InputLabel from "./InputLabel.vue";

interface SelectProps {
  label?: string;
  value: string;
  placeholder?: string;
  class?: string;
  options: string[];
}

const props = defineProps<SelectProps>();
const emit = defineEmits(["input"]);

const onInput = (ev: any) => emit("input", ev.target.value);
</script>
