<template>
  <div
    class="badge"
    :style="{ backgroundColor: props.color }"
  >
    <FontAwesomeIcon v-if="props.icon" :icon="props.icon" size="xs" />
    <span class="ml-1">{{ props.text }}</span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface TagProps {
  color?: string;
  icon?: string[] | IconDefinition;
  text: string;
}

const props = defineProps<TagProps>();
</script>
