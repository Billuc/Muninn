<template>
  <div class="text-center">
    <div class="text-2xl text-secondary font-bold">
      {{ format(props.date, "EEEE") }}
    </div>
    <div class="text-5xl text-secondary font-bold">
      {{ format(props.date, "do") }}
    </div>
    <div class="text-semibold">{{ format(props.date, "MMMM yyyy") }}</div>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";

interface HomeDateDisplayProps {
  date: Date;
}

const props = defineProps<HomeDateDisplayProps>();
</script>
