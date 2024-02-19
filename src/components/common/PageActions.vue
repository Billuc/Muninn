<script setup lang="ts"></script>

<template>
  <QTabs
    inline-label
    outside-arrows
    mobile-arrows
    indicator-color="transparent"
    dense
    @touchstart.stop
    @mousedown.stop
  >
    <slot></slot>
  </QTabs>
</template>
