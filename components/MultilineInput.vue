<template>
  <div
    :class="
      mergeClasses(
        'focus:outline-0',
        'm-0',
        'leading-normal',
        'empty:before:content-[attr(placeholder)]',
        'empty:before:text-sm',
        'empty:before:text-[var(--tw-prose-bullets)]',
        'empty:before:cursor-text'
      )
    "
    @input="onUpdate"
    @keydown.enter="onEnter"
    :placeholder="placeholder || ''"
    contenteditable
    tabindex="-1"
    ref="input"
  >
    {{ value }}
  </div>
</template>

<script setup lang="ts">
interface MultilineInputProps {
  value: string;
  detectEnter?: boolean;
  placeholder?: string;
}

const props = defineProps<MultilineInputProps>();
const emit = defineEmits(["input", "enter"]);
const { value, placeholder, detectEnter } = toRefs(props);
const input = ref(null);

const onUpdate = async (ev: any) => {
  emit("input", ev.target?.innerText.trim());
};
const onEnter = (ev: any) => {
  if (!detectEnter) return;
  ev.preventDefault();
  emit("enter", ev.target?.innerText.trim());
};
const resetContent = () =>
  ((input.value as unknown as HTMLDivElement).innerText = value.value);

defineExpose({ resetContent });
</script>
