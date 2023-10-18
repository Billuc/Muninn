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
  ></div>
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
    detectEnter.value &&
    (ev.inputType === "insertParagraph" ||
      (ev.inputType === "insertText" && text.includes("\n")))
  ) {
    emit("enter", text.replaceAll("\n", ""));
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

onMounted(() => {
  input.value!.innerText = value.value;
});

watch([value], () => {
  if (value.value !== input.value?.innerText) {
    input.value!.innerText = value.value;
  }
});
</script>
