<template>
  <div>
    <PageHeading><span class="text-accent">Events</span></PageHeading>

    <Calendar></Calendar>
  </div>
</template>

<script setup lang="ts">
import PageHeading from "~/components/layout/PageHeading.vue";
import Calendar from "~/components/events/Calendar.vue";

useHead({
  title: "Events",
});
</script>
