<template>
  <div
    :class="
      mergeClasses(
        'absolute',
        'top-1/2',
        'left-1/2',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'text-center'
      )
    "
  >
    <div class="text-4xl font-semibold">
      <FontAwesomeIcon :icon="faCancel" class="text-error" />
      {{ props.code }}
    </div>
    <div class="text-xl font-light">{{ props.message }}</div>

    <NuxtLink
      :href="props.fallbackUrl"
      :class="mergeClasses('btn', 'flex-row', 'flex-nowrap', 'mt-4')"
    >
      <FontAwesomeIcon :icon="faAnglesLeft" />
      Return
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { faAnglesLeft, faCancel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface ErrorPageProps {
  code: string | number;
  message: string;
  fallbackUrl: string;
}

const props = defineProps<ErrorPageProps>();
</script>
