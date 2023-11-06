<template>
  <Field
    :icon="props.icon"
    :clearable="props.clearable"
    :label="props.label"
    :value="dateValue"
    @clear="clear"
    :rules="rules"
  >
    <template #input="{ inputClass, id }">
      <DatePicker
        :value="props.value"
        :label-class="inputClass"
        class="flex-shrink w-full"
        @update:value="onUpdateDate"
        :input-id="id"
      />
    </template>
  </Field>
</template>

<script setup lang="ts">
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

interface TimeFieldProps {
  label?: string;
  clearable?: boolean;
  icon?: IconDefinition;
  value: Date;
  required?: boolean;
}

const props = defineProps<TimeFieldProps>();
const emit = defineEmits(["clear", "update:value"]);

const clear = () => emit("clear");
const onUpdateDate = (date: Date) => emit("update:value", date);

const dateValue = computed(() => format(props.value, "dd/MM/yyyy"));

const DATE_REGEX = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}");
const rules = props.required ? [(v: string) => DATE_REGEX.test(v)] : [];
</script>
