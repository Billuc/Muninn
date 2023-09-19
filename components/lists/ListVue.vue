<template>
  <div :class="mergeClasses('flex', 'flex-col', 'flex-nowrap')">
    <Draggable
      v-model="elementsArray"
      handle=".handle"
      item-key="id"
      :animation="150"
    >
      <template #item="{ element }">
        <ListElementVue
          v-if="!element.done || !hideChecked"
          :list-id="list.id"
          :element="element"
          class="mt-1"
        />
      </template>
    </Draggable>

    <AddElement :list-id="list.id" class="mt-1" />
  </div>
</template>

<script setup lang="ts">
import { useListStore } from "@/stores/listStore";
import ListElementVue from "./ListElementVue.vue";
import { List } from "~/models/List";
import _ from "lodash";
import Draggable from "vuedraggable";
import AddElement from "./AddElement.vue";

interface ListProps {
  hideChecked: boolean;
  list: List;
}

const props = defineProps<ListProps>();
const { hideChecked, list } = toRefs(props);
const store = useListStore();

const elementsArray = computed({
  get() {
    return _.sortBy([...list.value.elements.values()], (el) => el.index);
  },
  set(newArray) {
    store.orderElements(list.value.id, newArray);
  },
});
</script>
