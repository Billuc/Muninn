<template>
  <div :class="mergeClasses('relative', 'max-w-md', 'md:max-w-full')">
    <div
      :class="
        mergeClasses(
          'card',
          'shadow-xl',
          'grid',
          'grid-cols-1',
          'md:grid-cols-5',
          'p-2',
          'bg-base-300'
        )
      "
    >
      <EventsCalendarCard
        :date="props.date"
        :tag-filter="props.tagFilter"
        @update:date="updateDate"
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
      <EventsCalendarEvents
        :day="props.date"
        :tag-filter="props.tagFilter"
        :class="mergeClasses('md:col-span-2', 'rounded-box')"
      />
    </div>

    <EventsCreateEvent :date="props.date" />
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { type ID } from "~/data/models/ID";

interface CalendarProps {
  tagFilter: ID;
  date: Date;
}

const props = defineProps<CalendarProps>();
const emit = defineEmits(["update:date"]);

const updateDate = (newDate: Date) => emit("update:date", newDate);
</script>
