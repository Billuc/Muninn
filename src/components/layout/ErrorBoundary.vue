<script setup lang="ts">
import { onErrorCaptured, ref } from "vue";
import ErrorBanner from "./ErrorBanner.vue";

const error = ref<Error | null>(new Error("je suis une erreur"));

onErrorCaptured((err) => {
  error.value = err;
});
</script>

<template>
  <div>
    <slot></slot>

    <ErrorBanner :error="error" v-if="error" />
  </div>
</template>
