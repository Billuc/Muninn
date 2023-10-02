<template>
  <div
    :class="
      mergeClasses(
        'btn',
        'btn-sm',
        'flex-nowrap',
        'py-1',
        'tag',
        props.color ? `tag-${props.color}` : undefined
      )
    "
  >
    <FontAwesomeIcon
      v-if="props.icon"
      :icon="props.icon"
      :class="{ 'mr-1': !!props.text }"
    />
    <span v-if="props.text" class="truncate">{{ props.text }}</span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface TagVueProps {
  color?: string;
  icon?: string[] | IconDefinition;
  text?: string;
}

const props = defineProps<TagVueProps>();
</script>

<style>
@import url("~/assets/css/tags.css");
</style>
