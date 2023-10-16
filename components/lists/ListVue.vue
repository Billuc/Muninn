<template>
  <div>
    <ListElementsVue
      :list-id="props.list.id"
      :elements="elementTree"
      :hide-checked="props.hideChecked"
    />
    <AddElement :list-id="props.list.id" class="mt-1" />
  </div>
</template>

<script setup lang="ts">
import { useListStore } from "@/stores/listStore";
import { List, ListElementDTO, ListElement } from "~/models/List";
import _ from "lodash";
import AddElement from "./AddElement.vue";
import ListElementsVue from "./ListElementsVue.vue";

interface ListProps {
  hideChecked: boolean;
  list: List;
}

const props = defineProps<ListProps>();
const { list } = toRefs(props);
const store = useListStore();

const listElements = computed(() => [...list.value.elements.values()]);
const elementTree = ref(buildListArray(list.value.id, listElements.value));

function buildListArray(
  listId: number,
  elements: ListElement[],
  elementId?: number
): ListElementDTO[] {
  return _(elements)
    .chain()
    .filter((el) => el.parentId === elementId)
    .sortBy((el) => el.index)
    .map<ListElementDTO>((el) => ({
      id: el.id,
      title: el.title,
      done: el.done,
      index: el.index,
      children: buildListArray(listId, elements, el.id),
    }))
    .value();
}

watch(
  [listElements],
  () => (elementTree.value = buildListArray(list.value.id, listElements.value)),
  { deep: true }
);
watch(
  [elementTree],
  () => store.orderElements(list.value.id, elementTree.value),
  { deep: true }
);
</script>
