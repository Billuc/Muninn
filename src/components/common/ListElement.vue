<script setup lang="ts">
interface ListElementProps {
  index: number;
  selected?: boolean;
}

const props = defineProps<ListElementProps>();
</script>

<template>
  <div
    class="rounded-borders row items-center list-element"
    :class="{
      even: props.index % 2 == 0,
      odd: props.index % 2 == 1,
      selected: props.selected,
    }"
  >
    <slot />
  </div>
</template>

<style>
.list-element {
  border: solid 2px transparent;
  padding: 0 0.5rem;
}

.list-element.even {
  background: #ffffff;
}

.list-element.odd {
  background: #dddddd;
}

.list-element.selected {
  border-color: black;
}
</style>
