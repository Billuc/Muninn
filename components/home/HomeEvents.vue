<template>
  <div class="flex-grow p-1 overflow-hidden min-h-[192px]">
    <div class="text-xl font-semibold text-center mb-2">
      You have
      <span class="text-primary text-2xl font-bold">{{ numberOfEventsToday }}</span>
      event{{ numberOfEventsToday <= 1 ? "" : "s" }}
      today
    </div>

    <CalendarEvents :day="props.date">
      <template #no-event>{{ "" }}</template>
    </CalendarEvents>

    <CreateEvent />
  </div>
</template>

<script setup lang="ts">
import { useEventStore } from "~/stores/eventStore";
import CalendarEvents from "../events/CalendarEvents.vue";
import CreateEvent from "../events/CreateEvent.vue";

interface HomeEventsProps {
  date: Date;
}

const props = defineProps<HomeEventsProps>();
const store = useEventStore();

const numberOfEventsToday = computed(
  () => store.getEventsOfDay(props.date).length
);
</script>
