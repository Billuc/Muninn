<script setup lang="ts">
import { QToolbar, QTabs, QSpace } from "quasar";
import NavBarTab from "@/components/layout/NavBarTab.vue";
import icon from "@/assets/icon.svg";
</script>

<template>
  <QToolbar class="bg-secondary rounded-borders" id="navbar">
    <QTabs inline-label mobile-arrows class="full-width">
      <NavBarTab :icon="`img:${icon}`" to="/" label="Home" />

      <QSpace />

      <NavBarTab icon="mdi-developer-board" to="/boards" label="Boards" />

      <QSpace />

      <NavBarTab icon="mdi-cog" to="/config" label="Config" />
    </QTabs>
  </QToolbar>
</template>

<style scoped>
#navbar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
