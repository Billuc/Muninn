<template>
  <div class="flex flex-col items-center gap-2">
    <Button
      @click="date = new Date()"
      :class="
        mergeClasses(
          'btn-primary',
          'btn-outline',
          isToday ? 'btn-active' : undefined
        )
      "
    >
      Today
    </Button>

    <EventsEventTagFilter
      :selected="tagFilter"
      @update:selected="(v) => (tagFilter = v)"
    />

    <EventsCalendar :tag-filter="tagFilter" v-model:date="date" class="w-full mt-2" />
  </div>
</template>

<script setup lang="ts">
import { isSameDay } from "date-fns";

const tagFilter = ref("");
const date = ref(new Date());

const isToday = computed(() => isSameDay(date.value, new Date()));
</script>
