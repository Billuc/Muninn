<template>
  <div>
    <PageHeading><span>Events</span></PageHeading>

    <EventTagFilter
      :selected="tagFilter"
      @update:selected="(v) => (tagFilter = v)"
      class="w-full my-2"
    />

    <Calendar class="mx-auto" :tag-filter="tagFilter"></Calendar>
  </div>
</template>

<script setup lang="ts">
import PageHeading from "~/components/layout/PageHeading.vue";
import Calendar from "~/components/events/Calendar.vue";
import EventTagFilter from "~/components/events/EventTagFilter.vue";

const tagFilter = ref(-1);

useHead({
  title: "Events",
});
</script>
