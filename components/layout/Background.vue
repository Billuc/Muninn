<template>
  <div
    :class="
      mergeClasses(
        'absolute',
        'top-0',
        'left-0',
        'bottom-0',
        'right-0',
        'flex',
        'place-content-center',
        'z-0',
        'opacity-5',
        'pointer-events-none'
      )
    "
  >
    <FontAwesomeIcon :icon="props.icon" class="w-5/6 max-w-xs !h-auto text-accent" />
  </div>
</template>

<script setup lang="ts">
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface BackgroundProps {
  icon: IconDefinition;
}

const props = defineProps<BackgroundProps>();
</script>
