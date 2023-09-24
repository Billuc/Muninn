<template>
  <button
    @click="click"
    :class="
      mergeClasses(
        'btn',
        'btn-circle',
        'absolute',
        'transition-transform',
        'duration-300',
        'hover:-rotate-90',
        'bg-gradient-to-br',
        'from-primary',
        'to-secondary',
        'border-0'
      )
    "
    :disabled="props.disabled"
  >
    <Spinner v-if="props.loading" />
    <FontAwesomeIcon v-else :icon="props.icon" />
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
