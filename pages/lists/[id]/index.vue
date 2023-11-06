<template>
  <LayoutLoading v-if="pending" />
  <div v-else-if="list">
    <LayoutPageHeading>
      <template #prepend>
        <LayoutBackButton to="lists" label="Back to lists" class="mr-4" />
      </template>

      <span class="text-center mb-0 mr-2">{{ list.title }}</span>

      <template #append>
        <ListsListActions class="inline-block ml-2" :list="list" />
      </template>
    </LayoutPageHeading>
    <LayoutBackground :icon="faCheckSquare" />

    <ListsListPage :list="list" />
  </div>
  <div v-else>
    <LayoutBackground :icon="faCheckSquare" />
    <LayoutErrorPage
      :code="404"
      :message="`List with ID ${listId} not found !`"
      fallback-url="/lists"
    />
  </div>
</template>

<script setup lang="ts">
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { ListService } from "~/data/services/listService";

const route = useRoute();
const listId = getOneParam(route.params.id);

const listService = useService(ListService);
const { pending, data: list } = useLazyAsyncData(`list-${listId}`, () =>
  listService.get(listId)
);
const subscription = listService.subscribe(list, (l) => l.id == listId);

watch([list], () =>
  useHead({
    title: `Lists - ${list.value?.title}`,
  })
);

onBeforeUnmount(() => subscription.unsubscribe());
</script>
