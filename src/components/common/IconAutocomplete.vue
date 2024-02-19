<script setup lang="ts">
import Autocomplete from "@/components/common/Autocomplete.vue";
import { MDI_OPTIONS } from "@/utils/icons";
import { computed, ref } from "vue";

interface IconAutocompleteProps {
  modelValue: string | null;
  label: string;
}

const props = defineProps<IconAutocompleteProps>();
const emit = defineEmits(["update:model-value"]);

const currentValue = computed(() =>
  MDI_OPTIONS.find((val) => val.value == props.modelValue)
);

const options = ref<{ label: string; value: string }[]>(
  currentValue.value ? [currentValue.value] : []
);

const filter = (
  value: string,
  update: (fn: () => void) => void,
  abort: () => void
) => {
  if (value.length < 3) {
    abort();
    return;
  }

  update(() => {
    const needle = value.toLowerCase();
    options.value = MDI_OPTIONS.filter(
      (v) =>
        v.label.toLowerCase().includes(needle) || v.value == props.modelValue
    );
  });
};

const onUpdate = (v: string | null) => emit("update:model-value", v);
</script>

<template>
  <Autocomplete
    :label="props.label"
    :model-value="props.modelValue"
    @update:model-value="onUpdate"
    :options="options"
    :filter="filter"
  >
    <template #option="{ option, selected }">
      <QItemSection avatar>
        <QIcon :name="option.value" :color="selected ? 'primary' : ''" />
      </QItemSection>
      <QItemSection>
        <QItemLabel>{{ option.label }}</QItemLabel>
      </QItemSection>
    </template>
    <template #selected="{ option }">
      <QItemSection avatar>
        <QIcon :name="option?.value" />
      </QItemSection>
      <QItemSection>
        <QItemLabel>{{ option?.label }}</QItemLabel>
      </QItemSection>
    </template>
  </Autocomplete>
</template>
