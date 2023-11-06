<template>
  <div class="flex-grow p-1 overflow-hidden min-h-[192px] max-md:max-h-[192px]">
    <div class="text-xl font-semibold text-center mb-2">
      You have
      <span class="text-primary text-2xl font-bold">{{
        numberOfEventsToday
      }}</span>
      event{{ numberOfEventsToday <= 1 ? "" : "s" }}
      today
    </div>

    <EventsCalendarEvents :day="props.date" class="overflow-y-auto">
      <template #no-event>{{ "" }}</template>
    </EventsCalendarEvents>

    <EventsCreateEvent :date="props.date" />
  </div>
</template>

<script setup lang="ts">
import { EventService } from "~/data/services/eventService";

interface HomeEventsProps {
  date: Date;
}

const props = defineProps<HomeEventsProps>();
const service = useService(EventService);

const { pending, data: events } = useLazyAsyncData(
  `events-${props.date.toDateString()}`,
  () => service.getAllForDay(props.date)
);
const numberOfEventsToday = computed(() => (events.value ?? []).length);
</script>
