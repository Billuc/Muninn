<template>
  <div class="grid grid-cols-1 lg:grid-cols-9">
    <EventTagFilter
      :selected="tagFilter"
      @update:selected="(v) => (tagFilter = v)"
      class="w-full my-2 lg:flex-col lg:col-span-2"
    />

    <Calendar :tag-filter="tagFilter" class="mx-auto lg:col-span-7 w-full" />
  </div>
</template>

<script setup lang="ts">
import Calendar from "~/components/events/Calendar.vue";
import EventTagFilter from "~/components/events/EventTagFilter.vue";

const tagFilter = ref(-1);
</script>
