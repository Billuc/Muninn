<script setup lang="ts">
import { onErrorCaptured, ref } from "vue";
import ErrorBanner from "./ErrorBanner.vue";

const error = ref<Error | null>(null);

const onDismiss = () => (error.value = null);

onErrorCaptured((err) => {
  error.value = err;
});
</script>

<template>
  <div>
    <slot></slot>

    <ErrorBanner :error="error" v-if="error" @dismiss="onDismiss" />
  </div>
</template>
