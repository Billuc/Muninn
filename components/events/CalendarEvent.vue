<template>
  <div
    :class="
      mergeClasses(
        'border-b',
        'last-of-type:border-b-0',
        'p-2',
        'border-base-300',
        'border-dashed',
        'hover:bg-secondary-focus',
        'cursor-pointer'
      )
    "
  >
    <p class="text-xs font-light leading-3">{{ timeInterval }}</p>
    <p class="focus:outline-none text-lg font-medium leading-5">
      {{ props.title }}
    </p>
    <p class="text-sm" v-if="props.description">
      {{ props.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";

interface CalendarEventProps {
  start?: Date;
  end?: Date;
  title: string;
  description?: string;
}

const props = defineProps<CalendarEventProps>();

const timeInterval = computed(() => {
  if (!props.start && !props.end) return "Whole day";
  else if (props.start && !props.end) return format(props.start, "H:mm");
  else if (props.start && props.end)
    return `${format(props.start, "H:mm")} - ${format(props.end, "H:mm")}`;
});
</script>
