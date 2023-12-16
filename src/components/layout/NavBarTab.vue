<script setup lang="ts">
import { QRouteTab } from "quasar";

interface NavBarTabProps {
  icon: string;
  to: string;
  label: string;
  exact?: boolean;
}

const props = defineProps<NavBarTabProps>();
</script>

<template>
  <QRouteTab
    :icon="props.icon"
    :to="props.to"
    :label="props.label"
    :exact="props.exact"
  />
</template>

<style>
@media screen and (max-width: 600px) {
  .q-tab {
    padding: 0;
  }

  .q-tab .q-tab__label {
    display: none;
  }
}
</style>
