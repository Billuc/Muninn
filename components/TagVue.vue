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
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface TagVueProps {
  color?: string;
  icon?: string[] | IconDefinition;
  text?: string;
}

const props = defineProps<TagVueProps>();
</script>

<style>
.tag.tag-red {
  background-color: #ff2525;
  background-image: linear-gradient(90deg, #ff2525 20%, #ffe53b 120%);
}

.tag.tag-orange {
  background-color: #fe8e4d;
  background-image: linear-gradient(90deg, #fe8e4d 50%, #f7ce68 110%);
}

.tag.tag-yellow {
  background-color: #fffa5c;
  background-image: linear-gradient(90deg, #fffa5c 50%, #85ffbd 120%);
}

.tag.tag-green {
  background-color: #3eecac;
  background-image: linear-gradient(90deg, #3eecac 50%, #ee74e1 110%);
}

.tag.tag-cyan {
  background-color: #74ebd5;
  background-image: linear-gradient(90deg, #74ebd5 50%, #9face6 110%);
}

.tag.tag-blue {
  background-color: #0093e9;
  background-image: linear-gradient(90deg, #0093e9 -10%, #80d0c7 100%);
}

.tag.tag-magenta {
  background-color: #c850c0;
  background-image: linear-gradient(90deg, #c850c0 50%, #ffcc70 110%);
}
</style>
