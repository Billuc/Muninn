<template>
  <div class="flex flex-nowrap">
    <input
      :value="props.value"
      @input="onInput"
      :type="props.type ?? 'text'"
      :placeholder="props.placeholder"
      :pattern="props.pattern"
      :class="
        mergeClasses(
          'focus:outline-none',
          'flex-grow',
          'flex-shrink',
          'bg-transparent',
          props.inputClass
        )
      "
      ref="input"
    />

    <Button
      v-if="props.clearable"
      :icon="faRemove"
      class="btn-circle !btn-xs"
      @click="clear"
    />
  </div>
</template>

<script setup lang="ts">
import { faRemove } from "@fortawesome/free-solid-svg-icons";

interface InputProps {
  value: string;
  placeholder?: string;
  type?: string;
  pattern?: string;
  clearable?: boolean;
  inputClass?: string;
}

const props = defineProps<InputProps>();
const emit = defineEmits(["clear", "update:value"]);
const input = ref(null);

const clear = () => emit("clear");
const onInput = (ev: any) => emit("update:value", ev.target.value);

const focus = () => (input.value as unknown as HTMLElement).focus();
const blur = () => (input.value as unknown as HTMLElement).blur();
defineExpose({ focus, blur })
</script>
