<template>
  <label
    :class="
      mergeClasses(
        'label',
        'badge',
        'badge-ghost',
        'relative',
        '-mb-2',
        'ml-4',
        'z-[1]',
        'px-2'
      )
    "
  >
    <span class="label-text">{{ props.label }}</span>
  </label>
</template>

<script setup lang="ts">
interface InputLabelProps {
  label: string;
}

const props = defineProps<InputLabelProps>();
</script>
