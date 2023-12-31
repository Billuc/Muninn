<script setup lang="ts">
import { computed } from "vue";

interface AutocompleteItem {
  label: string;
  value: any;
}

interface AutocompleteProps {
  modelValue: any | null;
  label: string;
  options: AutocompleteItem[];
  filter: (
    value: string,
    update: (fn: () => void) => void,
    abort: () => void
  ) => void;
}

const props = defineProps<AutocompleteProps>();
const emit = defineEmits(["update:model-value"]);

const value = computed(() =>
  props.options.find((op) => op.value == props.modelValue)
);

const onUpdate = (v: AutocompleteItem | null) =>
  emit("update:model-value", v?.value);
</script>

<template>
  <QSelect
    filled
    dense
    hide-bottom-space
    use-input
    input-debounce="100"
    :label="props.label"
    :model-value="value"
    :options="props.options"
    @update:model-value="onUpdate"
    @filter="props.filter"
  >
    <template #option="{ index, itemProps, opt, selected }">
      <QItem v-bind="itemProps">
        <slot name="option" :index="index" :option="opt" :selected="selected">
          <QItemSection>
            <QItemLabel>{{ opt.label }}</QItemLabel>
          </QItemSection>
        </slot>
      </QItem>
    </template>
    <template #selected>
      <slot name="selected" :option="value">
        {{ value?.label }}
      </slot>
    </template>
  </QSelect>
</template>
