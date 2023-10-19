<template>
  <div>
    <template v-if="daysEventsWithTags.length > 0">
      <ul class="menu">
        <li
          v-for="{ event, tag } in daysEventsWithTags"
          :key="'event-' + event.id"
        >
          <CalendarEvent
            v-bind="event"
            :tag="tag"
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
      <slot name="no-event">
        <div class="text-center font-light py-4">No event for this day...</div>
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import CalendarEvent from "./CalendarEvent.vue";
import { Event } from "~/models/Event";
import EditEvent from "./EditEvent.vue";
import _ from "lodash";
import { useEventStore } from "~/stores/eventStore";
import { ID } from "~/models/ID";

interface CalendarEventsProps {
  day: Date;
  tagFilter?: ID;
}

const props = defineProps<CalendarEventsProps>();
const store = useEventStore();

const selectedEvent = ref<Event | null>(null);

const daysEventsWithTags = computed(() =>
  _(store.getEventsOfDay(props.day))
    .chain()
    .filter((e) => !props.tagFilter || e.tagId === props.tagFilter)
    .sortBy([
      (event) => event.start.getHours(),
      (event) => event.start.getMinutes(),
    ])
    .map((event) => ({ event: event, tag: store.tags.get(event.tagId) }))
    .value()
);

const selectEvent = (event: Event | null) => (selectedEvent.value = event);
</script>
