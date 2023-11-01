<template>
  <Loading v-if="pending" />
  <div v-else-if="list">
    <PageHeading>
      <template #prepend>
        <BackButton to="lists" label="Back to lists" class="mr-4" />
      </template>

      <span class="text-center mb-0 mr-2">{{ list.title }}</span>

      <template #append>
        <ListActions class="inline-block ml-2" :list="list" />
      </template>
    </PageHeading>
    <Background :icon="faCheckSquare" />

    <ListPage :list="list" />
  </div>
  <div v-else>
    <Background :icon="faCheckSquare" />
    <ErrorPage
      :code="404"
      :message="`List with ID ${listId} not found !`"
      fallback-url="/lists"
    />
  </div>
</template>

<script setup lang="ts">
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import BackButton from "~/components/layout/BackButton.vue";
import Background from "~/components/layout/Background.vue";
import ErrorPage from "~/components/layout/ErrorPage.vue";
import Loading from "~/components/layout/Loading.vue";
import PageHeading from "~/components/layout/PageHeading.vue";
import ListActions from "~/components/lists/ListActions.vue";
import ListPage from "~/components/lists/ListPage.vue";
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
