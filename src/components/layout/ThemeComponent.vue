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
  setCssVar("background-text", theme.value.backgroundText);
  setCssVar("primary", theme.value.primary);
  setCssVar("primary-text", theme.value.primaryText);
  setCssVar("secondary", theme.value.secondary);
  setCssVar("secondary-text", theme.value.secondaryText);
  setCssVar("list", theme.value.list);
});
</script>

<template>
  <div id="theme-component">
    <slot></slot>
  </div>
</template>
