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
    class="navbar-tab"
  />
</template>

<style>
.navbar-tab.q-tab {
  color: var(--q-list-neutral);
}

@media screen and (max-width: 600px) {
  .navbar-tab.q-tab {
    padding: 0;
  }

  .navbar-tab.q-tab .q-tab__label {
    display: none;
  }
}
</style>
