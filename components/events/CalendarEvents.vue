<template>
  <div>
    <template v-if="props.events.length > 0">
      <ul class="menu">
        <li v-for="{ event, tag } in props.events" :key="'event-' + event.id">
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
      <div class="text-center font-light py-4">No event for this day...</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import CalendarEvent from "./CalendarEvent.vue";
import { Event } from "~/models/Event";
import EditEvent from "./EditEvent.vue";
import _ from "lodash";
import { Tag } from "~/models/Tag";

interface CalendarEventsProps {
  events: { event: Event; tag?: Tag }[];
}

const props = defineProps<CalendarEventsProps>();

const selectedEvent = ref<Event | null>(null);

const selectEvent = (event: Event | null) => (selectedEvent.value = event);
</script>
