<template>
  <div :class="mergeClasses('flex', 'flex-col', 'flex-nowrap', `group`)">
    <Draggable
      :list="props.elements"
      handle=".handle"
      item-key="id"
      :animation="150"
      :group="{ name: 'list-elements' }"
    >
      <template #item="{ element }">
        <ListElementTree
          :element="element"
          :list-id="props.listId"
          :hide-checked="props.hideChecked"
        />
      </template>
    </Draggable>
  </div>
</template>

<script setup lang="ts">
import { ListElementDTO } from "~/models/List";
import _ from "lodash";
import Draggable from "vuedraggable";
import ListElementTree from "./ListElementTree.vue";

interface ListElementsVueProps {
  listId: number;
  elements: ListElementDTO[];
  hideChecked: boolean;
}

const props = defineProps<ListElementsVueProps>();
const emit = defineEmits(["update:elements"]);

const onUpdate = (newElements: ListElementDTO[]) =>
  emit("update:elements", newElements);
const onElementUpdated = (updatedElement: ListElementDTO) => {
  const index = props.elements.findIndex((el) => el.id === updatedElement.id);
  const clone = _.cloneDeep(props.elements);
  clone.splice(index, 1, updatedElement);
  console.log("elements", clone);
  emit("update:elements", clone);
};
</script>
