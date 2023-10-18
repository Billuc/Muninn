<template>
  <div
    :class="
      mergeClasses(
        'border-b',
        'last-of-type:border-b-0',
        'p-2',
        'border-base-300',
        'border-dashed',
        'cursor-pointer',
        'flex',
        'items-center'
      )
    "
  >
    <div class="flex-grow">
      <p class="text-xs font-light leading-3">{{ timeInterval }}</p>
      <p class="focus:outline-none text-lg font-medium leading-5">
        {{ props.title }}
      </p>
    </div>

    <TagVue v-if="props.tag" :icon="props.tag.icon" :color="props.tag.color" />
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import TagVue from "../TagVue.vue";
import { Tag } from "~/models/Tag";

interface CalendarEventProps {
  start?: Date;
  end?: Date;
  title: string;
  description?: string;
  tag?: Tag;
}

const props = defineProps<CalendarEventProps>();

const timeInterval = computed(() => {
  if (!props.start && !props.end) return "Whole day";
  else if (props.start && !props.end) return format(props.start, "H:mm");
  else if (props.start && props.end)
    return `${format(props.start, "H:mm")} - ${format(props.end, "H:mm")}`;
});
</script>
