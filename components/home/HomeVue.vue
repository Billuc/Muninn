<template>
  <div>
    <DateDisplay :date="date" class="pl-8" />

    <div
      :class="
        mergeClasses(
          'card',
          'flex-col',
          'md:flex-row',
          'flex-nowrap',
          'w-full',
          'mt-4',
          'shadow-xl',
          'p-2'
        )
      "
    >
      <div class="flex-grow p-1">
        <div class="text-xl font-semibold text-center mb-2">
          Today's Journal
        </div>
        <EntryList :date="date" />
      </div>

      <div class="divider md:divider-horizontal"></div>

      <div class="flex-grow p-1 overflow-hidden">
        <div class="text-xl font-semibold text-center mb-2">Today's Events</div>
        <CalendarEvents :day="date"></CalendarEvents>
        <CreateEvent />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CalendarEvents from "../events/CalendarEvents.vue";
import EntryList from "../journal/EntryList.vue";
import DateDisplay from "../journal/DateDisplay.vue";
import CreateEvent from "../events/CreateEvent.vue";

const date = new Date();
</script>
