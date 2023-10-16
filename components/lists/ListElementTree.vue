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

interface ListElementTreeProps {
  element: ListElementDTO;
  listId: number;
  hideChecked: boolean;
}

const props = defineProps<ListElementTreeProps>();
const emit = defineEmits(["update:element"]);

const onUpdateChildren = (newChildren: ListElementDTO[]) => {
  console.log("tree", props.element.title, newChildren);
  emit("update:element", {
    id: props.element.id,
    title: props.element.title,
    done: props.element.done,
    index: props.element.index,
    children: newChildren,
  });
};
</script>

<style>
.tree-root > .tree-add {
  display: none;
}

.tree-root:focus-within > .tree-add {
  display: flex;
}
</style>
