<template>
  <div>
    <PageHeading><span>Home</span></PageHeading>

    <DateDisplay :date="date" class="pl-8"/>

    <div
      :class="
        mergeClasses(
          'flex',
          'flex-col',
          'md:flex-row',
          'flex-nowrap',
          'gap-x-4',
          'gap-y-2',
          'w-full',
          'mt-4'
        )
      "
    >
      <div class="card bg-secondary flex-grow p-1">
        <div class="card-title self-center mb-2">Today's Journal</div>
        <EntryList :date="date" />
      </div>
      <div class="card bg-accent flex-grow p-1 overflow-hidden">
        <div class="card-title self-center mb-2">Today's Events</div>
        <CalendarEvents :date="date" :tag-filter="-1"></CalendarEvents>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CalendarEvents from "~/components/events/CalendarEvents.vue";
import DateDisplay from "~/components/journal/DateDisplay.vue";
import EntryList from "~/components/journal/EntryList.vue";
import PageHeading from "~/components/layout/PageHeading.vue";

const date = new Date();

useHead({
  title: "Home",
});
</script>
