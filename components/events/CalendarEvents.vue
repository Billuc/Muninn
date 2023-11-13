<template>
  <LayoutLoading v-if="loading" />
  <div v-else>
    <template v-if="daysEventsWithTags.length > 0">
      <ul class="menu">
        <li
          v-for="{ event, tag } in daysEventsWithTags"
          :key="'event-' + event.id"
        >
          <EventsCalendarEvent
            v-bind="event"
            :tag="tag"
            @click="selectEvent(event)"
            :class="mergeClasses('px-6', 'rounded-box', 'mb-1')"
          />
        </li>
      </ul>

      <EventsEditEvent
        :event="selectedEvent"
        @close="() => selectEvent(null)"
      />
    </template>

    <template v-else>
      <slot name="no-event">
        <div class="text-center font-light py-4">No event for this day...</div>
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { type Event } from "~/data/models/Event";
import { type ID } from "~/data/models/ID";
import { EventService } from "~/data/services/eventService";
import { EventTagService } from "~/data/services/eventTagService";

interface CalendarEventsProps {
  day: Date;
  tagFilter?: ID;
}

const props = defineProps<CalendarEventsProps>();
const eventService = useService(EventService);
const eventTagService = useService(EventTagService);

const selectedEvent = ref<Event | null>(null);
const { day: dayRef } = toRefs(props);

const { pending: loadingTags, data: tags } = useLazyAsyncData(() => eventTagService.getAll());
const { pending: loadingEvents, data: daysEvents } = useLazyAsyncData(
  "events",
  () => eventService.getAllForDay(dayRef.value),
  { watch: [dayRef] }
);

const daysEventsWithTags = computed(() =>
  _(daysEvents.value)
    .chain()
    .filter((e) => !props.tagFilter || e.tagId === props.tagFilter)
    .sortBy([
      (event) => event.start.getHours(),
      (event) => event.start.getMinutes(),
    ])
    .map((event) => ({
      event: event,
      tag: tags.value?.find((t) => t.id == event.tagId),
    }))
    .value()
);
const loading = computed(() => loadingTags.value || loadingEvents.value);

const selectEvent = (event: Event | null) => (selectedEvent.value = event);
</script>
