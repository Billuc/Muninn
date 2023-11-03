<template>
  <div class="btn btn-xs">{{ frequency }}</div>
</template>

<script setup lang="ts">
import { Frequency } from "~/data/models/Event";

interface FrequencyProps {
  frequency: Frequency;
}

const props = defineProps<FrequencyProps>();
</script>
