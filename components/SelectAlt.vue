<template>
  <Field
    :icon="props.icon"
    :clearable="props.clearable"
    :label="props.label"
    @clear="clear"
  >
    <template #input>
      <SelectDropdown
        class="flex-shrink"
        :options="props.options"
        :value="props.value"
        :placeholder="props.placeholder"
        @update:value="select"
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
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import SelectDropdown from "./SelectDropdown.vue";
import Field from "./Field.vue";

interface SelectOption {
  text: string;
  value: string;
}

interface SelectAltProps {
  label?: string;
  clearable?: boolean;
  icon?: IconDefinition;
  options: SelectOption[];
  value: string;
  placeholder?: string;
}

const props = defineProps<SelectAltProps>();
const emit = defineEmits(["clear", "update:value"]);

const clear = () => emit("clear");
const select = (opt: string) => emit("update:value", opt);
</script>
