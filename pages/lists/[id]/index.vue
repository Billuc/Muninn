<template>
  <div>
    <PageHeading>
      <span class="text-center text-primary mb-0 mr-2">{{ list.title }}</span>

      <template #append>
        <div class="inline-block ml-2">
          <EditList :list="list" />
          <DeleteList :list="list" />
        </div>
      </template>
    </PageHeading>

    <div :class="mergeClasses('flex', 'justify-end', 'gap-x-1', 'my-6')">
      <ShowCheckedToggle
        :show-checked="showChecked"
        @update:show-checked="(v) => (showChecked = v)"
      />
      <ClearCheckedButton :list="list" />
    </div>

    <ListVue :show-checked="showChecked" :list="list" />
  </div>
</template>

<script setup lang="ts">
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
const showChecked = ref(false);

useHead({
  title: `Lists - ${list.title}`,
});
</script>
