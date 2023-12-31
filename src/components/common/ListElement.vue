<script setup lang="ts">
interface ListElementProps {
  index: number;
}

const props = defineProps<ListElementProps>();
</script>

<template>
  <div
    class="rounded-borders row items-center"
    :class="{
      'even-element': props.index % 2 == 0,
      'odd-element': props.index % 2 == 1,
    }"
  >
    <slot />
  </div>
</template>
