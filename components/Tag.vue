<template>
  <div class="btn btn-xs" :style="{ backgroundColor: props.color }">
    <FontAwesomeIcon
      v-if="props.icon"
      :icon="props.icon"
      size="xs"
      :class="{ 'mr-1': !!props.text }"
    />
    <span v-if="props.text">{{ props.text }}</span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface TagProps {
  color?: string;
  icon?: string[] | IconDefinition;
  text?: string;
}

const props = defineProps<TagProps>();
</script>
