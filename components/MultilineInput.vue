<template>
  <div
    :class="
      mergeClasses(
        'focus:outline-0',
        'm-0',
        'leading-normal',
        'whitespace-pre-wrap',
        'empty:before:content-[attr(placeholder)]',
        'empty:before:text-sm',
        'empty:before:opacity-75',
        'empty:before:cursor-text'
      )
    "
    @input="onUpdate"
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

const onUpdate = (ev: any) => {
  const text: string = ev.target?.innerText;
  if (
    detectEnter &&
    (ev.inputType === "insertParagraph" ||
      (ev.inputType === "insertText" && text.endsWith("\n")))
  )
    emit("enter", text.trim());
  else emit("input", text);
};
const resetContent = () =>
  ((input.value as unknown as HTMLDivElement).innerText = value.value);

defineExpose({ resetContent });
</script>
