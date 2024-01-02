<script setup lang="ts">
import { computed } from "vue";

interface SelectItem {
  label: any;
  value: any;
}

interface SelectProps {
  modelValue: any | null;
  label?: string;
  options: SelectItem[];
  standout?: boolean;
}

const props = defineProps<SelectProps>();
const emit = defineEmits(["update:model-value"]);

const value = computed(() =>
  props.options.find((op) => op.value == props.modelValue)
);

const onUpdate = (v: SelectItem | null) => emit("update:model-value", v?.value);
</script>

<template>
  <QSelect
    :filled="!props.standout"
    :standout="!!props.standout"
    dense
    hide-bottom-space
    :label="props.label"
    :model-value="value"
    :options="props.options"
    @update:model-value="onUpdate"
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
