<template>
  <div v-if="!props.element.done || !props.hideChecked" class="tree-root">
    <ListsListElementVue
      :list-id="props.listId"
      :element="props.element"
      class="mt-1"
    />
    <ListsListElementsVue
      :list-id="props.listId"
      :parent-id="props.element.id"
      :hide-checked="props.hideChecked"
      class="pl-4"
    />
    <ListsAddElement
      :list-id="listId"
      :parent-id="props.element.id"
      :class="
        mergeClasses(
          'mt-1',
          'pl-4',
          'transition-all',
          'duration-300',
          'tree-add'
        )
      "
    />
  </div>
</template>

<script setup lang="ts">
import { type ListElement } from "~/data/models/List";
import { type ID } from "~/data/models/ID";

interface ListElementTreeProps {
  element: ListElement;
  listId: ID;
  hideChecked: boolean;
}

const props = defineProps<ListElementTreeProps>();
</script>

<style>
.tree-root > .tree-add {
  height: 0px;
  overflow: hidden;
}

.tree-root:focus-within > .tree-add {
  height: 1.5rem;
}
</style>
