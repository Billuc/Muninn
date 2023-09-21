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
        'py-1'
      )
    "
    @click="onClick"
  >
    <NuxtLink
      :class="
        mergeClasses(
          'w-full',
          'h-full',
          'flex',
          'justify-center',
          'items-center',
          'gap-x-2',
          'm-0',
          'no-underline',
          'text-lg'
        )
      "
      :href="props.href"
    >
      <TagVue
        v-if="props.tag"
        :icon="props.tag.icon"
        :color="props.tag.color"
      />
      {{ props.label }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import { Tag } from "~/models/Tag";
import TagVue from "../Tag.vue";

interface NotesGridElementProps {
  label: string;
  href?: string;
  tag?: Tag;
}

const props = defineProps<NotesGridElementProps>();
const emit = defineEmits(["click"]);

function onClick(ev: Event) {
  if (!props.href) {
    ev.preventDefault();
    emit("click");
  }
}
</script>
