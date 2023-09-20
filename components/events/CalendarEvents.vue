<template>
  <div>
    <template v-if="daysEvents.length > 0">
      <ul class="menu">
        <li v-for="event in daysEvents" :key="'event-' + event.id">
          <CalendarEvent
            v-bind="event"
            :tag="getTag(event)"
            @click="selectEvent(event)"
            :class="mergeClasses('px-6', 'rounded-box')"
          />
        </li>
      </ul>

      <EditEvent
        :event="selectedEvent"
        @close="() => selectEvent(null)"
      ></EditEvent>
    </template>

    <template v-else>
      <div class="text-center font-light py-4">No event for this day...</div>
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
  tagFilter: number;
}

const props = defineProps<CalendarEventsProps>();
const store = useEventStore();
const daysEvents = computed(() =>
  _(store.getEventsOfDay(props.date))
    .chain()
    .filter((e) => props.tagFilter < 0 || e.tagId === props.tagFilter)
    .sortBy([
      (event) => event.start.getHours(),
      (event) => event.start.getMinutes(),
    ])
    .value()
);

const selectedEvent = ref<Event | null>(null);

const selectEvent = (event: Event | null) => (selectedEvent.value = event);
const getTag = (event: Event) => store.tags.get(event.tagId);
</script>
