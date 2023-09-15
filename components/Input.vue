<template>
  <div class="w-full">
    <InputLabel v-if="props.label" :label="props.label" />

    <input
      v-bind="$attrs"
      :type="props.type"
      :placeholder="props.placeholder"
      :pattern="props.pattern"
      :class="
        mergeClasses(
          'input',
          'input-bordered',
          'w-full',
          'hover:brightness-95',
          'focus:brightness-100',
          'transition-all',
          'duration-200'
        )
      "
      :value="props.value"
    />
  </div>
</template>

<script setup lang="ts">
import InputLabel from "./InputLabel.vue";

interface InputProps {
  label?: string;
  value: string;
  placeholder?: string;
  type: string;
  pattern?: string;
}

defineOptions({ inheritAttrs: false });
const props = defineProps<InputProps>();
</script>
