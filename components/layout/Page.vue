<template>
  <div
    :class="
      mergeClasses(
        'px-4',
        'pb-16',
        'md:pb-4',
        'pt-4',
        'md:pt-24',
        'w-full',
        'md:w-2/3',
        'min-h-screen',
        'mx-auto'
      )
    "
  >
    <slot name="navbar"></slot>

    <div :class="mergeClasses(wide ? 'max-w-full' : 'max-w-xl', 'mx-auto')">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PageProps {
  wide?: boolean;
}

const props = defineProps<PageProps>();
</script>
