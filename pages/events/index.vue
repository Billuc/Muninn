<template>
  <div>
    <LayoutPageHeading><span>Events</span></LayoutPageHeading>
    <LayoutBackground :icon="faCalendar" />

    <EventsVue />
  </div>
</template>

<script setup lang="ts">
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

useHead({
  title: "Events",
});
</script>
