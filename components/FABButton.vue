<template>
  <button
    @click="click"
    :class="
      mergeClasses(
        'btn',
        'btn-circle',
        'btn-sm',
        'text-primary-content',
        'absolute',
        'transition-transform',
        'duration-300',
        'hover:scale-105',
        'bg-gradient-to-br',
        'from-primary',
        'via-primary',
        'to-accent',
        'border-0',
        'shadow-md'
      )
    "
    :disabled="props.disabled"
  >
    <Spinner v-if="props.loading" />
    <FontAwesomeIcon v-else :icon="props.icon" size="sm" />
  </button>
</template>

<script setup lang="ts">
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface FABButtonProps {
  disabled?: boolean;
  loading?: boolean;
  icon: IconDefinition;
}

const props = defineProps<FABButtonProps>();
const emit = defineEmits(["click"]);

function click() {
  if (props.loading || props.disabled) return;
  else emit("click");
}
</script>
