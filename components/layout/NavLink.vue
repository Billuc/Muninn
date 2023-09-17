<template>
  <NuxtLink
    :href="href"
    :class="mergeClasses('btn', 'md:btn-lg', 'flex-row', 'flex-nowrap', color)"
  >
    <FontAwesomeIcon :icon="icon" v-if="icon" />
    <span v-if="label" class="hidden md:block">{{ label }}</span>
    <slot></slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import mergeClasses from "~/utils/mergeClasses";

interface NavLinkProps {
  href: string;
  color?: string;
  icon?: IconDefinition;
  label?: string;
}

const props = defineProps<NavLinkProps>();
const { color, href, icon, label } = toRefs(props);
</script>
