<template>
  <button
    data-key="theme"
    :data-set-theme="props.themeName"
    :data-theme="props.themeName"
    data-act-class="outline"
    class="rounded-md p-2"
  >
    <div class="my-1">{{ props.themeName }}</div>
    <div class="join">
      <FontAwesomeIcon :icon="faJournalWhills" class="btn btn-xs text-primary join-item" size="xs" />
      <FontAwesomeIcon :icon="faCheckSquare" class="btn btn-xs text-secondary join-item" size="xs" />
      <FontAwesomeIcon :icon="faCalendar" class="btn btn-xs text-accent join-item" size="xs" />
      <FontAwesomeIcon :icon="faLightbulb" class="btn btn-xs text-neutral join-item" size="xs" />
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
