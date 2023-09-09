<template>
  <li
    :class="
      mergeClasses(
        'btn',
        'btn-secondary',
        'list-none',
        '-skew-y-3',
        'my-0',
        'w-full',
        'h-full'
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
          'text-lg'
        )
      "
      :href="props.href"
    >
      {{ props.label }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
interface TodosGridElementProps {
  label: string;
  href?: string;
}

const props = defineProps<TodosGridElementProps>();
const emit = defineEmits(["click"]);

function onClick(ev: Event) {
  if (!props.href) {
    ev.preventDefault();
    emit("click");
  }
}
</script>
