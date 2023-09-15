<template>
  <Input
    :class="mergeClasses('h-fit', 'min-h-[3rem]', props.class)"
    type="text"
    :label="props.label"
    :clearable="props.clearable"
    :placeholder="props.placeholder"
    :value="props.value"
    @clear="onClear"
  >
    <template #input="inputProps">
      <textarea
        v-bind="inputProps"
        :class="
          mergeClasses(
            'focus:outline-none',
            'flex-grow',
            'leading-5',
            'resize-none',
            'py-1',
            'box-content'
          )
        "
        @input="onInput"
        rows="1"
        ref="textarea"
      />
    </template>
  </Input>
</template>

<script setup lang="ts">
import Input from "./Input.vue";

interface MultilineInputProps {
  label?: string;
  value: string;
  placeholder?: string;
  class?: string;
  clearable?: boolean;
}

const props = defineProps<MultilineInputProps>();
const emit = defineEmits(["input"]);
const { value } = toRefs(props);
const textarea = ref(null);

const onInput = (ev: any) => emit("input", ev.target.value);
const onClear = (v: string) => emit("input", null);

watch([value], () => {
  let numberOfLineBreaks = (value.value.match(/\n/g) || []).length;
  // min-height + lines x line-height + padding + border
  let newHeight = 20 + numberOfLineBreaks * 20;

  const textareaEl = textarea.value as unknown as HTMLTextAreaElement;
  textareaEl.style.height = newHeight + "px";
});
</script>
