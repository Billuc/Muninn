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
    <ListsListGridElement
      v-for="list in lists"
      :key="`list-${list.id}`"
      :list="list"
    />
    <ListsCreateList />
  </div>
  <LayoutLoading v-else />
</template>

<script setup lang="ts">
import { ListService } from "~/data/services/listService";

const listService = useService(ListService);
const { pending, data: lists } = useLazyAsyncData("lists", () =>
  listService.getAll()
);
</script>
