<template>
  <div
    :class="
      mergeClasses(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'gap-2',
        'p-0',
        'relative'
      )
    "
    v-if="!pending"
  >
    <ListGridElement
      v-for="list in lists"
      :key="`list-${list.id}`"
      :list="list"
    />
    <CreateList />
  </div>
  <Loading v-else />
</template>

<script setup lang="ts">
import ListGridElement from "./ListGridElement.vue";
import CreateList from "./CreateList.vue";
import { ListService } from "~/data/services/listService";
import { List } from "~/data/models/List";
import Loading from "../layout/Loading.vue";

const { container } = useContainer();
const listService = container.resolve<ListService>(ListService);
const { pending, data: lists } = useLazyAsyncData("lists", () =>
  listService.getAll()
);
</script>
