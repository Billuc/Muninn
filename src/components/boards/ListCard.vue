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

function onTitleChange(newTitle: string) {
  console.log(newTitle);
}
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
    />
  </CardBase>
</template>
