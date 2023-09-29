<template>
  <div :class="mergeClasses('label', 'gap-1', 'p-0')">
    <div>
      <FontAwesomeIcon v-if="props.icon" :icon="props.icon" class="mr-1" />
      <span class="label-text">{{ props.label }}</span>
    </div>

    <div class="flex">
      <AutocompleteDropdown
        class="flex-shrink"
        :options="props.options"
        :value="props.value"
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

      <Button
        v-if="props.clearable"
        :icon="faRemove"
        class="btn-circle !btn-xs"
        @click="clear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconDefinition, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import AutocompleteDropdown from "./AutocompleteDropdown.vue";

interface AutocompleteOption {
  text: string;
  value: string;
}

interface SelectAltProps {
  label?: string;
  clearable?: boolean;
  icon?: IconDefinition;
  options: AutocompleteOption[];
  value: string;
  placeholder?: string;
}

defineOptions({ inheritAttrs: false });
const props = defineProps<SelectAltProps>();
const emit = defineEmits(["clear", "update:value", "newOption"]);

const clear = () => emit("clear");
const select = (opt: string) => emit("update:value", opt);
const newOption = (newOpt: string) => emit("newOption", newOpt);
</script>
