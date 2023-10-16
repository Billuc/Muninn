<template>
  <div>
    <PageHeading>
      Today is
      <span class="text-secondary">{{ format(date, "EEEE") }}</span> the
      <span class="text-secondary">{{ format(date, "do") }}</span> of
      <span>{{ format(date, "MMMM") }}</span>
    </PageHeading>

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
import PageHeading from "../layout/PageHeading.vue";
import { format } from "date-fns";

const date = new Date();
</script>
