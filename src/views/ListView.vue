<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import EditList from "@/components/lists/EditList.vue";
import DeleteList from "@/components/lists/DeleteList.vue";
import PageActions from "@/components/common/PageActions.vue";
import BackButton from "@/components/common/BackButton.vue";
import ListTree from "@/components/lists/ListTree.vue";
import HideCheckedToggle from "@/components/lists/HideCheckedToggle.vue";
import ClearChecked from "@/components/lists/ClearChecked.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ListService } from "@/data/services/listService";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getOneParam } from "@/utils/route";
import { ListElement } from "@/data/models/List";

const listService = useService(ListService);
const route = useRoute();
const listId = getOneParam(route.params.id);

const listData = await listService.get(listId);
const list = ref(listData);
useSubscription(listService, list);

const elements: ListElement[] = [
  {
    id: "1",
    title: "Todo 1",
    parentId: "",
    done: true,
    index: 0,
    listId: listId,
  },
  {
    id: "2",
    title: "Todo 2",
    parentId: "",
    done: false,
    index: 1,
    listId: listId,
  },
  {
    id: "3",
    title: "Todo 2.1",
    parentId: "2",
    done: true,
    index: 0,
    listId: listId,
  },
];

const editNode = (v: { id: string; value: string }) => console.log(v);
const removeNode = (id: string) => console.log(id);
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

    <ListTree
      :elements="elements"
      @edit-node="editNode"
      @remove-node="removeNode"
      class="q-mt-sm"
    />
  </div>
</template>
