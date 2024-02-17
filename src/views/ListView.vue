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
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { getOneParam } from "@/utils/route";
import { ListElementService } from "@/data/services/listElementService";
import { ListElement } from "@/data/models/List";
import ListElements from "@/components/lists/ListElements.vue";
import ListCompletionCard from "@/components/lists/ListCompletionCard.vue";

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

const completion = computed(
  () =>
    listElements.value.filter((el) => el.done).length /
    (listElements.value.length || 1)
);

const onOrderElements = async (v: ListElement[]) => {
  await listElementService.sortChildren("", v);
};
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

    <ListCompletionCard class="q-my-md" :completion="completion" />

    <ListElements
      :elements="listElements"
      :list-id="list.id"
      @order="onOrderElements"
      class="q-mt-sm montserrat"
    />
  </div>
</template>
