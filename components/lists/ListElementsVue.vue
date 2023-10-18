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
import { ID } from "~/models/ID";

interface ListElementsVueProps {
  listId: ID;
  elements: ListElementDTO[];
  hideChecked: boolean;
}

const props = defineProps<ListElementsVueProps>();
const emit = defineEmits(["update:elements"]);
</script>
