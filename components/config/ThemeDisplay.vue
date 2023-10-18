<template>
  <button
    data-key="theme"
    :data-set-theme="props.themeName"
    :data-theme="props.themeName"
    data-act-class="outline"
    class="rounded-box p-2 border-2 border-primary relative outline-offset-2"
  >
    <div class="my-1">{{ props.themeName }}</div>
    <Background :icon="faJournalWhills" />
  </button>
</template>

<script setup lang="ts">
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";
import Background from "../layout/Background.vue";

interface ThemeDisplayProps {
  themeName: string;
}

const props = defineProps<ThemeDisplayProps>();
</script>
