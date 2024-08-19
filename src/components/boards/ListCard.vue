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
import HideCheckedToggle from "../lists/HideCheckedToggle.vue";
import DeleteList from "../lists/DeleteList.vue";
import ClearChecked from "../lists/ClearChecked.vue";
import { ListOnlineService } from "@/data/services/listOnlineService";
import { ListElementOnlineService } from "@/data/services/listElementOnlineService";

interface ListCardProps {
  id: ID;
  online: boolean;
}

const listOfflineService = useService(ListService);
const listOnlineService = useService(ListOnlineService);
const listElementOfflineService = useService(ListElementService);
const listElementOnlineService = useService(ListElementOnlineService);

const props = defineProps<ListCardProps>();
const emit = defineEmits(["up", "down"]);

const listService = props.online ? listOnlineService : listOfflineService;
const listElementService = props.online
  ? listElementOnlineService
  : listElementOfflineService;

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
  <CardBase @up="() => emit('up')" @down="() => emit('down')" v-if="listCard">
    <TextEditor
      class="text-h6 text-weight-bold"
      :model-value="listCard.title"
      @update:model-value="onTitleChange"
      placeholder="Title"
    />

    <ListElements
      :elements="listElements"
      :list-id="props.id"
      :hide-checked="listCard.hideChecked"
      @order="onOrderElements"
      class="montserrat"
    />

    <template #actions>
      <HideCheckedToggle :list="listCard" :online="props.online" />
      <ClearChecked :list="listCard" :online="props.online" />
      <DeleteList :list="listCard" :online="props.online" />
    </template>
  </CardBase>
</template>
