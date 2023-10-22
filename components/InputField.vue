<template>
  <Field
    :label="props.label"
    :icon="props.icon"
    :clearable="props.clearable"
    :value="props.value"
    :rules="props.rules"
    @clear="onClear"
    @update:value="onInput"
  >
    <template #input="{ inputClass, onInput, value, id }">
      <input
        :type="props.type ?? 'text'"
        :value="value"
        @input="(ev: any) => onInput(ev.target.value)"
        :class="inputClass"
        :pattern="props.pattern"
        :placeholder="props.placeholder"
        :id="id"
      />
    </template>
  </Field>
</template>

<script setup lang="ts">
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Field from "./Field.vue";

interface InputFieldProps {
  label?: string;
  clearable?: boolean;
  icon?: IconDefinition;
  value: string;
  rules?: ((v: string) => boolean)[];
  type?: string;
  pattern?: string;
  placeholder?: string;
}

const props = defineProps<InputFieldProps>();
const emit = defineEmits(["clear", "update:value"]);

const onClear = () => emit("clear");
const onInput = (v: string) => emit("update:value", v);
</script>
