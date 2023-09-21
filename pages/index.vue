<template>
  <div>
    <PageHeading><span>Home</span></PageHeading>

    <DateDisplay :date="date" class="pl-8"/>

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
        <div class="text-xl font-semibold text-center mb-2">Today's Journal</div>
        <EntryList :date="date" />
      </div>

      <div class="divider md:divider-horizontal"></div>

      <div class="flex-grow p-1 overflow-hidden">
        <div class="text-xl font-semibold text-center mb-2">Today's Events</div>
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
