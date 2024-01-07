<script setup lang="ts">
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ThemeService } from "@/data/services/themeService";
import { setCssVar } from "quasar";
import { ref, watchEffect } from "vue";

const themeService = useService(ThemeService);
const themeData = await themeService.get();
const theme = ref(themeData);
useSubscription(themeService, theme);

watchEffect(() => {
  setCssVar("background", theme.value.background);
  setCssVar("primary", theme.value.primary);
  setCssVar("secondary", theme.value.secondary);
  setCssVar("list-even", theme.value.listEven);
  setCssVar("list-odd", theme.value.listOdd);
  setCssVar("list-neutral", theme.value.listNeutral);
});
</script>

<template>
  <div id="theme-component">
    <slot></slot>
  </div>
</template>

<style>
body {
  background-color: var(--q-background);
}
</style>
