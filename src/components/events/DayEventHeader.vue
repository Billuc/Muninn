<script setup lang="ts">
import { computed } from "vue";

interface DayEventHeaderProps {
  eventCount: number;
}

const props = defineProps<DayEventHeaderProps>();

const header = computed(() => {
  switch (props.eventCount) {
    case 0:
      return "No event this day";
    case 1:
      return "1 event this day";
    default:
      return `${props.eventCount} events this day`;
  }
});
</script>

<template>
  <div class="day-event-header">
    <QChip :label="header" color="primary" class="q-mb-none" />
  </div>
</template>

<style>
.day-event-header {
  position: relative;
  padding-bottom: 1rem;
  text-align: center;
}

.day-event-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-1px);
  width: 2px;
  height: 1rem;
  background-color: var(--q-primary);
}
</style>
