<template>
  <NuxtLink
    :href="href"
    :class="mergeClasses('btn', color, active ? 'btn-active' : undefined)"
  >
    <FontAwesomeIcon :icon="icon" size="lg" v-if="icon" />
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
const router = useRouter();
const { color, href, icon, exact } = toRefs(props);

const active = computed(() => {
  const currentPath = router.currentRoute.value.path;
  return exact.value
    ? currentPath === href.value
    : currentPath.startsWith(href.value);
});
</script>
