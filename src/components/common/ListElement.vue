<script setup lang="ts">
interface ListElementProps {
  index: number;
  selected?: boolean;
}

const props = defineProps<ListElementProps>();
</script>

<template>
  <div
    class="row items-center list-element"
    :class="{
      selected: props.selected,
    }"
  >
    <slot />
  </div>
</template>

<style>
.list-element {
  border: solid 2px transparent;
  padding: 2px 16px;
  background: var(--q-list);
}

.list-element.selected {
  border-color: black;
}

.list-element:first-of-type {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.list-element:last-of-type {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
