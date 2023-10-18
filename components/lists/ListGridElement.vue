<template>
  <NuxtLink
    :class="
      mergeClasses(
        'card',
        'card-side',
        'py-2',
        'px-4',
        'items-center',
        'gap-2',
        'bg-base-200',
        'hover:bg-base-300',
        'transition-colors',
        'duration-300',
        'shadow-md'
      )
    "
    :href="`/lists/${props.list.id}`"
  >
    <FontAwesomeIcon :icon="faCheckSquare" size="2xl" class="text-accent" />

    <div :class="mergeClasses('card-body', 'p-0', 'gap-0')">
      <div class="card-title leading-5">
        {{ props.list.title }}
      </div>
      <div class="text-xs opacity-75 ml-2">{{ done }} / {{ all }} done</div>
    </div>

    <div
      class="radial-progress text-secondary"
      :style="{ '--value': (100 * done) / all, '--size': '1.5rem' }"
    ></div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { List } from "~/models/List";

interface ListGridElementProps {
  list: List;
}

const props = defineProps<ListGridElementProps>();

const done = computed(
  () => [...props.list.elements.values()].filter((el) => el.done).length
);
const all = computed(() => props.list.elements.size);
</script>
