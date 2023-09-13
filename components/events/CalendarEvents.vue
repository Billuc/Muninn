<template>
  <div>
    <CalendarEvent title="This is a test event" />
    <CalendarEvent title="This is a 2nd test event" :start="new Date()" />
    <CalendarEvent
      title="This is a 3rd test event"
      :start="new Date()"
      :end="new Date()"
      description="This is the description"
    />
    <CalendarEvent
      title="This is a 4th test event"
      description="Another description"
    />
  </div>
</template>

<script setup lang="ts">
import CalendarEvent from "./CalendarEvent.vue";

interface CalendarEventsProps {
  date: Date;
}

const props = defineProps<CalendarEventsProps>();
</script>
