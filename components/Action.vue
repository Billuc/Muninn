<template>
  <div
    :class="
      mergeClasses('w-full', 'px-4', 'py-2', 'hover:bg-base-300', 'rounded-box')
    "
  >
    <div @click="onClick" class="flex gap-2 cursor-pointer items-center">
      <FontAwesomeIcon
        :icon="props.icon"
        :class="props.iconClass"
        v-if="props.icon"
      />
      <span v-if="props.label">{{ props.label }}</span>
    </div>

    <slot name="dialog"></slot>
  </div>
</template>

<script setup lang="ts">
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface ActionProps {
  label?: string;
  icon?: IconDefinition;
  iconClass?: string;
}

const props = defineProps<ActionProps>();
const emit = defineEmits(["click"]);

const onClick = () => emit("click");
</script>
