<template>
  <div class="form-control w-full">
    <label v-if="label" class="label pb-1">
      <span class="label-text">{{ props.label }}</span>
    </label>

    <input
      type="text"
      :placeholder="props.placeholder"
      :class="
        mergeClasses(
          'input',
          'input-bordered',
          'outline-none',
          'focus:outline-none',
          'w-full',
          'hover:brightness-90',
          'focus:brightness-125',
          'transition-all',
          'duration-200',
          props.inputClass
        )
      "
      :value="props.value"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
interface TextInputProps {
  label?: string;
  value: string;
  inputClass?: string;
  placeholder?: string;
}

const props = defineProps<TextInputProps>();
const emit = defineEmits(["input"]);

function onChange(ev: any) {
  emit("input", ev.target.value);
}
</script>
