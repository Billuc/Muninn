<template>
  <div class="w-full">
    <label
      v-if="props.label"
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

    <input
      type="text"
      :placeholder="props.placeholder"
      :class="
        mergeClasses(
          'input',
          'input-bordered',
          'w-full',
          'hover:brightness-95',
          'focus:brightness-100',
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
