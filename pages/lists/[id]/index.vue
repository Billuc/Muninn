<template>
  <div>
    <PageHeading>
      <template #prepend>
        <BackButton to="lists" label="Back to lists" class="mr-4" />
      </template>

      <span class="text-center mb-0 mr-2">{{ list.title }}</span>

      <template #append>
        <div class="inline-block ml-2">
          <EditList :list="list" />
          <DeleteList :list="list" />
        </div>
      </template>
    </PageHeading>
    <Background :icon="faCheckSquare" />

    <ListPage :list="list" />
  </div>
</template>

<script setup lang="ts">
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import BackButton from "~/components/layout/BackButton.vue";
import Background from "~/components/layout/Background.vue";
import PageHeading from "~/components/layout/PageHeading.vue";
import DeleteList from "~/components/lists/DeleteList.vue";
import EditList from "~/components/lists/EditList.vue";
import ListPage from "~/components/lists/ListPage.vue";
import { useListStore } from "~/stores/listStore";

const route = useRoute();
const store = useListStore();
const listId = getOneParam(route.params.id);
const list = store.getList(listId);

useHead({
  title: `Lists - ${list.title}`,
});
</script>
