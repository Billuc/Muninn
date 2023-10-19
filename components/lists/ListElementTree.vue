<template>
  <div v-if="!props.element.done || !props.hideChecked" class="tree-root">
    <ListElementVue
      :list-id="props.listId"
      :element="props.element"
      class="mt-1"
    />
    <ListElementsVue
      :list-id="props.listId"
      :elements="props.element.children"
      :hide-checked="props.hideChecked"
      class="pl-4"
    />
    <AddElement
      :list-id="listId"
      :parent-id="props.element.id"
      :class="mergeClasses('mt-1', 'pl-4', 'tree-add')"
    />
  </div>
</template>

<script setup lang="ts">
import { ListElementDTO } from "~/models/List";
import ListElementVue from "./ListElementVue.vue";
import ListElementsVue from "./ListElementsVue.vue";
import AddElement from "./AddElement.vue";
import { ID } from "~/models/ID";

interface ListElementTreeProps {
  element: ListElementDTO;
  listId: ID;
  hideChecked: boolean;
}

const props = defineProps<ListElementTreeProps>();
const emit = defineEmits(["update:element"]);
</script>

<style>
.tree-root > .tree-add {
  display: none;
}

.tree-root:focus-within > .tree-add {
  display: flex;
}
</style>
