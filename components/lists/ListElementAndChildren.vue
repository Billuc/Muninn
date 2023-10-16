<template>
  <div v-if="!props.element.done || !props.hideChecked">
    <ListElementVue
      :list-id="props.listId"
      :element="props.element"
      class="mt-1"
    />
    <ListElementsVue
      :list-id="props.listId"
      :elements="props.element.children"
      :hide-checked="props.hideChecked"
      class="pl-2"
    />
  </div>
  <div v-else></div>
</template>

<script setup lang="ts">
import { ListElementDTO } from "~/models/List";

interface ListElementAndChildrenProps {
  listId: number;
  element: ListElementDTO;
  hideChecked: boolean;
}

const props = defineProps<ListElementAndChildrenProps>();
</script>
