<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import EditList from "@/components/lists/EditList.vue";
import DeleteList from "@/components/lists/DeleteList.vue";
import PageActions from "@/components/common/PageActions.vue";
import BackButton from "@/components/common/BackButton.vue";
import HideCheckedToggle from "@/components/lists/HideCheckedToggle.vue";
import ClearChecked from "@/components/lists/ClearChecked.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ListService } from "@/data/services/listService";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getOneParam } from "@/utils/route";
import { ListElementService } from "@/data/services/listElementService";
import SortableListTree from "@/components/lists/SortableListTree.vue";
import { ListElement } from "@/data/models/List";

const listService = useService(ListService);
const listElementService = useService(ListElementService);
const route = useRoute();
const listId = getOneParam(route.params.id);

const listData = await listService.get(listId);
const list = ref(listData);
useSubscription(listService, list);

const listElementsData = await listElementService.getAllChildren(listId);
const listElements = ref(listElementsData);
useSubscription(
  listElementService,
  listElements,
  (v) => v.listId == listId && v.parentId == ""
);

const onOrderElements = async (v: ListElement[]) =>
  await listElementService.sortChildren("", v);
</script>

<template>
  <div>
    <Title>
      <template #prefix><BackButton name="lists" /></template>
      <template #text>{{ list.title }}</template>
    </Title>

    <PageActions>
      <EditList :list="list" />
      <DeleteList :list="list" />
      <HideCheckedToggle :list="list" />
      <ClearChecked :list="list" />
    </PageActions>

    <SortableListTree
      :elements="listElements"
      :list-id="list.id"
      @update:elements="onOrderElements"
      class="q-mt-sm montserrat"
    />
  </div>
</template>
