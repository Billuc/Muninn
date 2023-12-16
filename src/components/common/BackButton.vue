<script setup lang="ts">
import { useRouter } from "vue-router";

interface BackButtonProps {
  name?: string;
}

const props = defineProps<BackButtonProps>();
const router = useRouter();

const onClick = () =>
  router.push({
    name: props.name,
  });
</script>

<template>
  <QBtn
    icon="arrow_back_ios"
    label="Back"
    @click="onClick"
    flat
    no-wrap
    class="back-button"
  />
</template>

<style>
@media screen and (max-width: 600px) {
  .back-button .q-btn__content span {
    display: none !important;
  }
}
</style>
