<template>
  <button
    data-key="theme"
    :data-set-theme="props.themeName"
    :data-theme="props.themeName"
  >
    <div>{{ props.themeName }}</div>
    <div class="flex">
      <FontAwesomeIcon :icon="faJournalWhills" class="btn btn-xs btn-primary" />
      <FontAwesomeIcon :icon="faCheckSquare" class="btn btn-xs btn-secondary" />
      <FontAwesomeIcon :icon="faCalendar" class="btn btn-xs btn-accent" />
      <FontAwesomeIcon :icon="faLightbulb" class="btn btn-xs btn-neutral" />
    </div>
  </button>
</template>

<script setup lang="ts">
import {
  faCalendar,
  faCheckSquare,
  faJournalWhills,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface ThemeDisplayProps {
  themeName: string;
}

const props = defineProps<ThemeDisplayProps>();
</script>
