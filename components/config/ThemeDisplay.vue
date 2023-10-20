<template>
  <button
    data-key="theme"
    :data-set-theme="props.themeName"
    :data-theme="props.themeName"
    :class="
      mergeClasses(
        'rounded-box',
        'px-2',
        'relative',
        'w-full',
        'flex',
        'gap-1',
        'justify-center',
        'items-center',
        'border-2',
        props.selected ? 'border-neutral' : 'border-transparent'
      )
    "
  >
    <div>
      {{ props.themeName[0].toUpperCase() + props.themeName.slice(1) }}
    </div>
    <div class="inline-block w-1 h-4 rounded-box bg-primary"></div>
    <div class="inline-block w-1 h-4 rounded-box bg-secondary"></div>
    <div class="inline-block w-1 h-4 rounded-box bg-accent"></div>
    <Background :icon="faJournalWhills" />
  </button>
</template>

<script setup lang="ts">
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";
import Background from "../layout/Background.vue";

interface ThemeDisplayProps {
  themeName: string;
  selected?: boolean;
}

const props = defineProps<ThemeDisplayProps>();
</script>
