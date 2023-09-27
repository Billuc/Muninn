<template>
  <div :class="mergeClasses('label', 'gap-1', 'p-0')">
    <div>
      <FontAwesomeIcon v-if="props.icon" :icon="props.icon" class="mr-1" />
      <span class="label-text">{{ props.label }}</span>
    </div>

    <div class="flex">
      <SelectDropdown
        class="flex-shrink"
        :options="props.options"
        :value="props.value"
        @update:value="select"
      >
        <template #selected="selectedProps">
          <slot name="selected" v-bind="selectedProps"></slot>
        </template>

        <template #option="optionProps">
          <slot name="option" v-bind="optionProps"></slot>
        </template>
      </SelectDropdown>

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
import SelectDropdown from "./SelectDropdown.vue";

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
}

defineOptions({ inheritAttrs: false });
const props = defineProps<SelectAltProps>();
const emit = defineEmits(["clear", "update:value"]);

const clear = () => emit("clear");
const select = (opt: string) => emit("update:value", opt);
</script>
