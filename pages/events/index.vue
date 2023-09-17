<template>
  <div>
    <PageHeading><span class="text-primary">Events</span></PageHeading>

    <Calendar class="mx-auto"></Calendar>
  </div>
</template>

<script setup lang="ts">
import PageHeading from "~/components/layout/PageHeading.vue";
import Calendar from "~/components/events/Calendar.vue";

useHead({
  title: "Events",
});
</script>
