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
    tabindex="0"
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
const emit = defineEmits(["update:value", "enter"]);
const { value, placeholder, detectEnter } = toRefs(props);
const input = ref<HTMLDivElement | null>(null);

const onUpdate = (ev: any) => {
  const text: string = ev.target?.innerText;

  if (
    detectEnter &&
    (ev.inputType === "insertParagraph" ||
      (ev.inputType === "insertText" && text.endsWith("\n")))
  ) {
    emit("enter", text.trim());
    reset();
  } else {
    emit("update:value", text);
  }
};
const reset = () => {
  if (input.value) input.value.innerText = value.value;
};

const blur = () => input.value?.blur();
defineExpose({ blur });

watch([value], () => {
  const range = document!.getSelection()!.getRangeAt(0);
  const pos = range.endOffset;

  input.value!.innerHTML = value.value;
  
  const newRange = document.createRange();
  const selection = window.getSelection()!;
  const node = input.value!.childNodes[0];
  
  console.log(range, node);

  selection.removeAllRanges();

  if (!!node) {
    newRange.setStart(node, pos > node.textContent!.length ? 0 : pos);
    newRange.collapse(true);
    selection.addRange(newRange);
  }
});
</script>
