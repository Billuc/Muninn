<script setup lang="ts">
import { computed } from "vue";

interface ErrorBannerProps {
  error: Error;
}

const props = defineProps<ErrorBannerProps>();

const errorMessage = computed(
  () => `${props.error.name} - ${props.error.message}`
);
</script>

<template>
  <QBanner rounded class="error-banner bg-negative text-white">
    {{ errorMessage }}
  </QBanner>
</template>

<style>
.error-banner {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 100;
}
</style>
