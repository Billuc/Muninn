<script setup lang="ts">
import { ListElement } from "@/data/models/List";
import _ from "lodash";
import ListElementVue from "./ListElementVue.vue";
import List from "../common/List.vue";
import NewListElement from "./NewListElement.vue";
import { ID } from "@/data/models/ID";
import Sortable, { SortableEvent } from "sortablejs";
import { computed, onMounted, ref } from "vue";

interface ListElementsProps {
  listId: ID;
  elements: ListElement[];
  hideChecked: boolean;
  noEdit?: boolean;
}

const props = defineProps<ListElementsProps>();
const emit = defineEmits(["order"]);

const list = ref<InstanceType<typeof List> | null>(null);

const sortedElements = computed(() =>
  _(props.elements)
    .chain()
    .sortBy((el) => el.index)
    .value()
);

const elementFilter = (element: ListElement): boolean => {
  if (!props.hideChecked) return true;
  else return !element.done;
};

onMounted(() => {
  if (!!props.noEdit) return;

  Sortable.create(list.value!.$el, {
    draggable: ".list-element",
    handle: ".handle",
    onEnd: (ev: SortableEvent) => {
      const newElements = _.cloneDeep(sortedElements.value);
      const removed = newElements.splice(ev.oldIndex!, 1);
      newElements.splice(ev.newIndex!, 0, ...removed);
      emit("order", newElements);
    },
  });
});
</script>

<template>
  <div>
    <List
      :elements="sortedElements"
      :filter="elementFilter"
      ref="list"
      no-color
    >
      <template #element="{ element }">
        <ListElementVue :element="element" :no-edit="props.noEdit" />
      </template>
    </List>

    <NewListElement
      :list-id="props.listId"
      :next-index="props.elements.length"
      v-if="!props.noEdit"
    />
  </div>
</template>
