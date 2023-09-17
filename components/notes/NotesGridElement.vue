<template>
  <li
    :class="
      mergeClasses(
        'btn',
        'btn-primary',
        'list-none',
        '-skew-y-3',
        'my-0',
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
          'm-0',
          'no-underline',
          'text-lg',
          'flex',
          'flex-col',
          'items-center'
        )
      "
      :href="props.href"
    >
      {{ props.label }}

      <TagList :tags="props.tags" />
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import { Tag } from "~/models/Tag";
import TagList from "../TagList.vue";

interface NotesGridElementProps {
  label: string;
  href?: string;
  tags: Tag[];
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
