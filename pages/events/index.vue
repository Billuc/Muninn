<template>
  <div>
    <PageHeading><span>Events</span></PageHeading>
    <Background :icon="faCalendar" />

    <EventsVue />
  </div>
</template>

<script setup lang="ts">
import PageHeading from "~/components/layout/PageHeading.vue";
import EventsVue from "~/components/events/EventsVue.vue";
import Background from "~/components/layout/Background.vue";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

useHead({
  title: "Events",
});
</script>
