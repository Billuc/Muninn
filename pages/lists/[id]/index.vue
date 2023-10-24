<template>
  <div v-if="list">
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
import PageHeading from "~/components/layout/PageHeading.vue";
import ListActions from "~/components/lists/ListActions.vue";
import ListPage from "~/components/lists/ListPage.vue";
import { useListStore } from "~/stores/listStore";

const route = useRoute();
const store = useListStore();
const listId = getOneParam(route.params.id);
const list = getList();

useHead({
  title: `Lists - ${list?.title}`,
});

function getList() {
  try {
    return store.getList(listId);
  } catch {
    return null;
  }
}
</script>
