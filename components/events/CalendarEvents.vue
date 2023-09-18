<template>
  <div>
    <template v-if="daysEvents.length > 0">
      <CalendarEvent
        v-for="event in daysEvents"
        :key="'event-' + event.id"
        v-bind="event"
        @click="selectEvent(event)"
      />

      <EditEvent
        :event="selectedEvent"
        @close="() => selectEvent(null)"
      ></EditEvent>
    </template>

    <template v-else>
      <div class="text-center font-light">No event for this day...</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useEventStore } from "~/stores/eventStore";
import CalendarEvent from "./CalendarEvent.vue";
import { Event } from "~/models/Event";
import EditEvent from "./EditEvent.vue";
import _ from "lodash";

interface CalendarEventsProps {
  date: Date;
}

const props = defineProps<CalendarEventsProps>();
const store = useEventStore();
const daysEvents = computed(() =>
  _.sortBy(store.getEventsOfDay(props.date), [
    (event) => event.start.getHours(),
    (event) => event.start.getMinutes(),
  ])
);

const selectedEvent = ref<Event | null>(null);

const selectEvent = (event: Event | null) => (selectedEvent.value = event);
</script>
