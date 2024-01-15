<script setup lang="ts">
import { ListElement } from "@/data/models/List";
import _ from "lodash";
import Draggable from "vuedraggable";
import ListTreeElement from "./ListTreeElement.vue";
import { ID } from "@/data/models/ID";
import { computed } from "vue";

interface SortableListTreeProps {
  elements: ListElement[];
  listId: ID;
}

const props = defineProps<SortableListTreeProps>();
const emit = defineEmits(["update:elements"]);

const sortedElements = computed(() =>
  _(props.elements)
    .sortBy((el) => el.index)
    .value()
);

const onUpdate = (v: ListElement[]) => emit("update:elements", v);
</script>

<template>
  <Draggable
    :model-value="sortedElements"
    @update:model-value="onUpdate"
    item-key="id"
    :animation="150"
    :group="{ name: 'list-elements' }"
  >
    <template #item="{ element }">
      <ListTreeElement :element="element" :list-id="props.listId" />
    </template>
  </Draggable>
</template>
