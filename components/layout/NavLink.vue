<template>
  <NuxtLink
    :href="href"
    :class="mergeClasses('btn', 'flex-row', 'flex-nowrap', color)"
  >
    <FontAwesomeIcon :icon="icon" v-if="icon" />
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
  exact?: boolean;
}

const props = defineProps<NavLinkProps>();
const { color, href, icon, exact } = toRefs(props);
</script>
