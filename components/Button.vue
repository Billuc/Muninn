<template>
  <button
    @click="click"
    :class="mergeClasses('btn', 'btn-sm', 'transition-colors', 'duration-300')"
    :disabled="props.disabled"
  >
    <Spinner v-if="props.loading" />
    <FontAwesomeIcon v-else-if="props.icon" :icon="props.icon" />

    <span v-if="props.label && !props.compact" class="hidden md:block">{{
      props.label
    }}</span>

    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  icon?: IconDefinition;
  label?: string;
  compact?: boolean;
}

const props = defineProps<ButtonProps>();
const emit = defineEmits(["click"]);

function click() {
  if (props.loading || props.disabled) return;
  else emit("click");
}
</script>
