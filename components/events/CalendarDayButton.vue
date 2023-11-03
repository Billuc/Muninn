<template>
  <Button
    :class="
      mergeClasses(
        'btn-circle',
        !isSameMonth(props.day, props.date) ? 'opacity-50' : undefined,
        isSameDay(props.day, props.date) ? 'btn-primary' : 'btn-ghost',
        'relative'
      )
    "
  >
    {{ day.getDate() }}
    <!-- <div class="absolute left-1/2 bottom-[2px] -translate-x-1/2">
      {{ ".".repeat(Math.min(3, eventNumber)) }}
    </div> -->
  </Button>
</template>

<script setup lang="ts">
import { isSameDay, isSameMonth } from "date-fns";
import { type ID } from "~/data/models/ID";

interface CalendarDayButtonProps {
  day: Date;
  date: Date;
  tagFilter?: ID;
}

const props = defineProps<CalendarDayButtonProps>();
// const store = useEventStore();

// const eventNumber = computed(() =>
//   store
//     .getEventsOfDay(props.day)
//     .filter((ev) => !props.tagFilter || ev.tagId === props.tagFilter)
//     .length
// );
</script>
