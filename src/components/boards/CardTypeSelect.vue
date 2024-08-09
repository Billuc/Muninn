<script setup lang="ts">
import { CardType } from "@/data/models/Board";
import Select from "../common/Select.vue";

interface CardTypeSelectProps {
  modelValue: CardType;
}

const props = defineProps<CardTypeSelectProps>();
const emit = defineEmits(["update:model-value"]);

const options = Object.entries(CardType).map(([label, value]) => ({
  value,
  label,
}));

const onUpdate = (v: CardType) => emit("update:model-value", v);
</script>

<template>
  <Select
    label="Card Type"
    :options="options"
    :model-value="props.modelValue"
    @update:model-value="onUpdate"
  >
  </Select>
</template>
