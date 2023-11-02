<template>
  <LayoutLoading v-if="pending" />
  <div :class="mergeClasses('flex', 'flex-col', 'flex-nowrap', `group`)" v-else>
    <Draggable
      :list="sortedElements"
      @change="handleChange"
      handle=".handle"
      item-key="id"
      :animation="150"
      :group="{ name: 'list-elements' }"
    >
      <template #item="{ element }">
        <ListsListElementTree
          :element="element"
          :list-id="props.listId"
          :hide-checked="props.hideChecked"
        />
      </template>
    </Draggable>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import Draggable from "vuedraggable";
import { type ID } from "~/data/models/ID";
import type { ListElement } from "~/data/models/List";
import { ListElementService } from "~/data/services/listElementService";

interface ListElementsVueProps {
  listId: ID;
  parentId?: ID;
  hideChecked: boolean;
}

const props = defineProps<ListElementsVueProps>();
const service = useService(ListElementService);

const { pending, data: elements } = useLazyAsyncData(
  `elements-${props.listId}-${props.parentId ?? ""}`,
  () => service.getAllChildren(props.listId, props.parentId)
);
useSubscription(
  service,
  elements,
  (v) => v.listId == props.listId && v.parentId == (props.parentId ?? "")
);

const sortedElements = ref<ListElement[]>([]);

const { execute: handleChange } = useAsyncAction(async () => {
  await service.sortChildren(
    props.parentId ?? "",
    sortedElements.value
  );
});

watch(
  [elements],
  () =>
    (sortedElements.value = _.sortBy(elements.value ?? [], (el) => el.index))
);
</script>
