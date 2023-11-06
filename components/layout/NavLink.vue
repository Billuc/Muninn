<template>
  <NuxtLink
    :href="props.href"
    :class="
      mergeClasses(
        'btn',
        'max-md:btn-circle',
        'md:btn-lg',
        'flex-row',
        'flex-nowrap',
        'col-span-2',
        'max-md:shadow-md',
        'max-md:shadow-primary-content',
        props.color
      )
    "
  >
    <FontAwesomeIcon :icon="props.icon" v-if="props.icon" />

    <span v-if="props.label" class="hidden md:block">{{ props.label }}</span>
    
    <slot></slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import mergeClasses from "~/utils/mergeClasses";

interface NavLinkProps {
  href?: string;
  color?: string;
  icon?: IconDefinition;
  label?: string;
}

const props = defineProps<NavLinkProps>();
</script>
