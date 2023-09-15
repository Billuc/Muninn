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
interface MultilineFieldProps {
  value: string;
  detectEnter?: boolean;
  placeholder?: string;
}

const props = defineProps<MultilineFieldProps>();
const emit = defineEmits(["input", "enter"]);
const { value, placeholder, detectEnter } = toRefs(props);
const input = ref(null);

const onUpdate = (ev: any) => {
  const text: string = ev.target?.innerText;

  if (
    detectEnter &&
    (ev.inputType === "insertParagraph" ||
      (ev.inputType === "insertText" && text.endsWith("\n")))
  ) {
    emit("enter", text.trim());
  } else {
    emit("input", text);
  }
};

watch([value], () => {
  const range = document!.getSelection()!.getRangeAt(0);
  const pos = range.endOffset;
  const div = input.value as unknown as HTMLDivElement;

  div.innerHTML = value.value;

  const newRange = document.createRange();
  const selection = window.getSelection()!;
  const node = div.childNodes[0];

  selection.removeAllRanges();

  if (!!node) {
    newRange.setStart(node, node && pos > node.textContent!.length ? 0 : pos);
    newRange.collapse(true);
    selection.addRange(newRange);
  }
});
</script>
