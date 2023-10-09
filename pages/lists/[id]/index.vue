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

    <div :class="mergeClasses('flex', 'justify-center', 'gap-x-2', 'mb-10', '-mt-4')">
      <ShowCheckedToggle
        :hide-checked="hideChecked"
        @update:hide-checked="(v) => (hideChecked = v)"
      />
      <ClearCheckedButton :list="list" />
    </div>

    <ListVue :hide-checked="hideChecked" :list="list" />
  </div>
</template>

<script setup lang="ts">
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import BackButton from "~/components/layout/BackButton.vue";
import Background from "~/components/layout/Background.vue";
import PageHeading from "~/components/layout/PageHeading.vue";
import ClearCheckedButton from "~/components/lists/ClearCheckedButton.vue";
import DeleteList from "~/components/lists/DeleteList.vue";
import EditList from "~/components/lists/EditList.vue";
import ListVue from "~/components/lists/ListVue.vue";
import ShowCheckedToggle from "~/components/lists/ShowCheckedToggle.vue";
import { useListStore } from "~/stores/listStore";

const route = useRoute();
const store = useListStore();
const listId = Number(route.params.id);
const list = store.getList(listId);
const hideChecked = ref(false);

useHead({
  title: `Lists - ${list.title}`,
});
</script>
