<template>
  <div v-if="pending">
    <ListsListElementsVue
      :list-id="props.list.id"
      :elements="elementTree"
      :hide-checked="props.list.hideChecked"
    />
    <ListsAddElement :list-id="props.list.id" class="mt-1" />
  </div>
  <Loading v-else />
</template>

<script setup lang="ts">
import _ from "lodash";
import { type List, type ListTreeElement } from "~/data/models/List";
import { ListElementService } from "~/data/services/listElementService";

interface ListProps {
  list: List;
}

const props = defineProps<ListProps>();

const listElementService = useService(ListElementService);
const { pending, data: listElements } = useLazyAsyncData(
  `elements-${props.list.id}`,
  () => listElementService.getAllFromList(props.list.id)
);
const subscription = listElementService.subscribe(
  listElements,
  (v) => v.listId == props.list.id
);

const elementTree = ref<ListTreeElement[]>([]);

watch(
  [listElements],
  () =>
    (elementTree.value = buildListTree(
      props.list.id,
      listElements.value ?? []
    )),
  { deep: true }
);
watch(
  [elementTree],
  async () => {
    const updatedElements = flattenListTree(props.list.id, elementTree.value);
    for (const e of updatedElements) {
      await listElementService.update(e);
    }
  },
  { deep: true }
);

onBeforeUnmount(() => subscription.unsubscribe());
</script>
