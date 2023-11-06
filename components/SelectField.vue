<template>
  <Field
    :icon="props.icon"
    :clearable="props.clearable"
    :label="props.label"
    :value="props.value"
    :rules="props.rules"
    @clear="clear"
    @update:value="select"
  >
    <template #input="{ value, inputClass, onInput, id }">
      <SelectDropdown
        class="flex-shrink w-full"
        :options="props.options"
        :value="value"
        :placeholder="props.placeholder"
        :label-class="inputClass"
        :flat-list="props.flatList"
        @update:value="onInput"
        :input-id="id"
      >
        <template #selected="selectedProps">
          <slot name="selected" v-bind="selectedProps"></slot>
        </template>

        <template #placeholder="placeholderProps">
          <slot name="placeholder" v-bind="placeholderProps"></slot>
        </template>

        <template #option="optionProps">
          <slot name="option" v-bind="optionProps"></slot>
        </template>

        <template #no-option>
          <slot name="no-option"></slot>
        </template>
      </SelectDropdown>
    </template>
  </Field>
</template>

<script setup lang="ts">
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface SelectOption {
  text: string;
  value: string;
}

interface SelectFieldProps {
  label?: string;
  clearable?: boolean;
  icon?: IconDefinition;
  options: SelectOption[];
  value: string;
  placeholder?: string;
  rules?: ((v: string) => boolean)[];
  flatList?: boolean;
}

const props = defineProps<SelectFieldProps>();
const emit = defineEmits(["clear", "update:value"]);

const clear = () => emit("clear");
const select = (opt: string) => emit("update:value", opt);
</script>
