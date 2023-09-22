<template>
  <li
    :class="
      mergeClasses(
        'card',
        'bg-base-200',
        'hover:bg-base-300',
        'transition-colors',
        'duration-300',
        'list-none',
        'w-full',
        'h-full',
        'py-2',
        '-skew-y-2',
        'origin-top-right',
        'border-2',
        'border-secondary',
        'hover:border-secondary-focus'
      )
    "
  >
    <NuxtLink
      :class="
        mergeClasses(
          'w-full',
          'h-full',
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'gap-2',
          'm-0',
          'no-underline',
          'text-lg'
        )
      "
      :href="`/lists/${props.list.id}`"
    >
      {{ props.list.title }}
      <progress
        class="progress progress-accent w-1/2"
        :value="completion"
        max="100"
      ></progress>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import { List } from "~/models/List";

interface ListGridElementProps {
  list: List;
}

const props = defineProps<ListGridElementProps>();

const completion = computed(
  () =>
    (100 * [...props.list.elements.values()].filter((el) => el.done).length) /
    props.list.elements.size
);
</script>
