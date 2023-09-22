<template>
  <div class="flex flex-col items-center gap-2">
    <EventTagFilter
      :selected="tagFilter"
      @update:selected="(v) => (tagFilter = v)"
    />

    <Calendar :tag-filter="tagFilter" class="w-full" />
  </div>
</template>

<script setup lang="ts">
import Calendar from "~/components/events/Calendar.vue";
import EventTagFilter from "~/components/events/EventTagFilter.vue";

const tagFilter = ref(-1);
</script>
