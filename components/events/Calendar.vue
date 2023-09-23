<template>
  <div :class="mergeClasses('relative', 'max-w-md', 'md:max-w-full')">
    <div
      :class="
        mergeClasses(
          'card',
          'shadow-xl',
          'overflow-hidden',
          'grid',
          'grid-cols-1',
          'md:grid-cols-5',
          'p-2',
          'bg-base-300'
        )
      "
    >
      <CalendarCard
        v-model:date="date"
        :tag-filter="props.tagFilter"
        :class="
          mergeClasses(
            'px-4',
            'py-4',
            'bg-base-100',
            'md:col-span-3',
            'rounded-box'
          )
        "
      />
      <CalendarEvents
        :day="date"
        :tag-filter="props.tagFilter"
        :class="mergeClasses('md:col-span-2', 'rounded-box')"
      />
    </div>

    <CreateEvent />
  </div>
</template>

<script setup lang="ts">
import CalendarEvents from "./CalendarEvents.vue";
import CreateEvent from "./CreateEvent.vue";
import CalendarCard from "./CalendarCard.vue";
import _ from "lodash";

interface CalendarProps {
  tagFilter: number;
}

const props = defineProps<CalendarProps>();

const date = ref(new Date());
</script>
