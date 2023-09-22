<template>
  <div :class="mergeClasses('relative', 'max-w-md', 'md:max-w-full')">
    <div
      :class="
        mergeClasses(
          'card',
          'shadow-xl',
          'overflow-hidden',
          'grid',
          'grid-cols-1',
          'md:grid-cols-5',
          'p-2',
          'bg-base-300'
        )
      "
    >
      <CalendarCard
        v-model:date="date"
        :tag-filter="tagFilter"
        :class="
          mergeClasses(
            'px-4',
            'py-4',
            'bg-base-100',
            'md:col-span-3',
            'rounded-box'
          )
        "
      />
      <CalendarEvents
        :events="daysEventsWithTags"
        :class="mergeClasses('md:col-span-2', 'rounded-box')"
      />
    </div>

    <CreateEvent />
  </div>
</template>

<script setup lang="ts">
import CalendarEvents from "./CalendarEvents.vue";
import CreateEvent from "./CreateEvent.vue";
import CalendarCard from "./CalendarCard.vue";
import { useEventStore } from "~/stores/eventStore";
import _ from "lodash";

interface CalendarProps {
  tagFilter: number;
}

const props = defineProps<CalendarProps>();
const store = useEventStore();

const date = ref(new Date());

const daysEventsWithTags = computed(() =>
  _(store.getEventsOfDay(date.value))
    .chain()
    .filter((e) => props.tagFilter < 0 || e.tagId === props.tagFilter)
    .sortBy([
      (event) => event.start.getHours(),
      (event) => event.start.getMinutes(),
    ])
    .map((event) => ({ event: event, tag: store.tags.get(event.tagId) }))
    .value()
);
</script>
