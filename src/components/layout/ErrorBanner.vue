<script setup lang="ts">
import { computed } from "vue";

interface ErrorBannerProps {
  error: Error;
}

const props = defineProps<ErrorBannerProps>();
const emit = defineEmits(["dismiss"]);

const errorMessage = computed(
  () => `${props.error.name} - ${props.error.message}`
);

const onDismiss = () => emit("dismiss");
</script>

<template>
  <QBanner rounded inline-actions class="error-banner bg-negative text-white">
    {{ errorMessage }}

    <template #action>
      <QBtn
        flat
        round
        padding="xs"
        color="white"
        icon="mdi-close"
        @click="onDismiss"
      />
    </template>
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
