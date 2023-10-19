<template>
  <Field
    :icon="props.icon"
    :label="props.label"
    :value="String(props.value)"
    :rules="rules"
  >
    <template #input>
      <Toggle :value="props.value" @update:value="onInput" />
    </template>
  </Field>
</template>

<script setup lang="ts">
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Field from "./Field.vue";
import Toggle from "./Toggle.vue";

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
