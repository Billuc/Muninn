<script setup lang="ts">
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ID } from "@/data/models/ID";
import { ListService } from "@/data/services/listService";
import { ref } from "vue";
import CardBase from "./CardBase.vue";
import TextEditor from "./TextEditor.vue";
import ListElements from "../lists/ListElements.vue";
import { ListElementService } from "@/data/services/listElementService";
import { ListElement } from "@/data/models/List";

interface ListCardProps {
  id: ID;
}

const listService = useService(ListService);
const listElementService = useService(ListElementService);

const props = defineProps<ListCardProps>();

const listCardData = await listService.get(props.id);
const listCard = ref(listCardData);
useSubscription(listService, listCard);

const listElementsData = await listElementService.getAllChildren(props.id);
const listElements = ref(listElementsData);
useSubscription(
  listElementService,
  listElements,
  (v) => v.listId == props.id && v.parentId == ""
);

const onTitleChange = async (newTitle: string) => {
  await listService.update({
    ...listCard.value,
    title: newTitle,
  });
};

const onOrderElements = async (v: ListElement[]) => {
  await listElementService.sortChildren("", v);
};
</script>

<template>
  <CardBase>
    <TextEditor
      class="text-h6 text-weight-bold"
      :model-value="listCard.title"
      @update:model-value="onTitleChange"
      placeholder="Title"
    />

    <ListElements
      :elements="listElements"
      :list-id="props.id"
      :hide-checked="false"
      @order="onOrderElements"
      class="montserrat"
    />
  </CardBase>
</template>
