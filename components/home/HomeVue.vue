<template>
  <div>
    <div class="flex justify-evenly mb-6">
      <HomeDateDisplay :date="date" />
    </div>

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
          'md:min-h-[384px]'
        )
      "
    >
      <HomeJournal :date="date" />

      <HomeEvents :date="date" class="md:col-span-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeJournal from "./HomeJournal.vue";
import HomeEvents from "./HomeEvents.vue";
import HomeDateDisplay from "./HomeDateDisplay.vue";

const date = new Date();
</script>
