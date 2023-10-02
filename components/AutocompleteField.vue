<template>
  <Field
    :icon="props.icon"
    :label="props.label"
    :clearable="props.clearable"
    :value="props.value"
    @clear="clear"
  >
    <template #input="{ value }">
      <AutocompleteDropdown
        class="flex-shrink"
        :options="props.options"
        :value="value"
        :placeholder="props.placeholder"
        @update:value="select"
        @new-option="newOption"
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

        <template #no-option="noOptionProps">
          <slot name="no-option" v-bind="noOptionProps"></slot>
        </template>
      </AutocompleteDropdown>
    </template>
  </Field>
</template>

<script setup lang="ts">
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import AutocompleteDropdown from "./AutocompleteDropdown.vue";
import Field from "./Field.vue";

interface AutocompleteOption {
  text: string;
  value: string;
}

interface AutocompleteFieldProps {
  label?: string;
  clearable?: boolean;
  icon?: IconDefinition;
  options: AutocompleteOption[];
  value: string;
  placeholder?: string;
}

const props = defineProps<AutocompleteFieldProps>();
const emit = defineEmits(["clear", "update:value", "newOption"]);

const clear = () => emit("clear");
const select = (opt: string) => emit("update:value", opt);
const newOption = (newOpt: string) => emit("newOption", newOpt);
</script>
