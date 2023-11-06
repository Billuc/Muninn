<template>
  <Button
    :icon="faAnglesLeft"
    :label="props.label ?? 'Back'"
    class="back-button btn-ghost"
    @click="onClick"
  ></Button>
</template>

<script setup lang="ts">
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

interface BackButtonProps {
  to: string;
  toParams?: Record<string, string>;
  label?: string;
}

const props = defineProps<BackButtonProps>();
const router = useRouter();

const onClick = () => router.push({ name: props.to, params: props.toParams });
</script>

<style>
.page-heading .back-button {
  display: inline-flex;
}
</style>