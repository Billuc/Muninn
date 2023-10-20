<template>
  <div>
    <h3 class="text-secondary text-xl font-bold leading-4">
      {{ format(props.date, "MMMM d") }}
    </h3>
    <h2 class="text-secondary text-2xl font-extrabold">
      {{ format(props.date, "EEEE") }}
    </h2>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";

interface DateDisplayProps {
  date: Date;
}

const props = defineProps<DateDisplayProps>();
</script>
