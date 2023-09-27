<template>
  <div>
    <DateDisplay :date="date" class="pl-8" />

    <div
      :class="
        mergeClasses(
          'relative',
          'grid',
          'grid-cols-1',
          'md:grid-cols-3',
          'w-full',
          'mt-4',
          'gap-3',
          'md:min-h-[384px]',
        )
      "
    >
      <HomeJournal :date="date" />

      <HomeEvents :date="date" class="md:col-span-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import DateDisplay from "../journal/DateDisplay.vue";
import HomeJournal from "./HomeJournal.vue";
import HomeEvents from "./HomeEvents.vue";

const date = new Date();
</script>
