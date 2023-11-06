<template>
  <Field
    :icon="props.icon"
    :label="props.label"
    :value="String(props.value)"
    :rules="rules"
  >
    <template #input="{ id }">
      <Toggle :value="props.value" @update:value="onInput" :id="id" />
    </template>
  </Field>
</template>

<script setup lang="ts">
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface ToggleFieldProps {
  value: boolean;
  icon?: IconDefinition;
  label?: string;
  required?: boolean;
}

const props = defineProps<ToggleFieldProps>();
var emit = defineEmits(["update:value"]);

const rules = computed(() =>
  props.required ? [(v: string) => v === "true"] : []
);

const onInput = (v: boolean) => emit("update:value", v);
</script>
