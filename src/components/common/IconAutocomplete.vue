<script setup lang="ts">
import * as fa from "@quasar/extras/fontawesome-v6";
import Autocomplete from "@/components/common/Autocomplete.vue";
import { ref } from "vue";

interface IconAutocompleteProps {
  modelValue: string | null;
  label: string;
}

const props = defineProps<IconAutocompleteProps>();
const emit = defineEmits(["update:model-value"]);

const faMapping: { [k: string]: string } = {
  fas: "fa-solid",
  far: "fa-regular",
  fab: "fa-brands",
};
const faFamilyMapping: { [k: string]: string } = {
  fas: "Solid",
  far: "Regular",
  fab: "Brands",
};
const allFaOptions = Object.entries(fa).map((v) => {
  const iconName = v[0];
  const iconPrefix = iconName.slice(0, 3);
  const iconFamily = faMapping[iconPrefix];
  const iconRawName = iconName.slice(3);
  const iconValue = iconRawName.replaceAll(
    new RegExp(/([A-Z])/g),
    (match: string) => `-${match.toLowerCase()}`
  );

  const label =
    iconRawName[0].toUpperCase() +
    iconRawName.slice(1).replaceAll(new RegExp(/([A-Z])/g), ` $1`) +
    " (" +
    faFamilyMapping[iconPrefix] +
    ")";
  const value = `${iconFamily} fa${iconValue}`;

  return { label, value };
});

const options = ref<{ label: string; value: string }[]>([]);

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
    options.value = allFaOptions.filter((v) =>
      v.label.toLowerCase().includes(needle)
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
