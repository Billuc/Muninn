<template>
  <div>
    <PageHeading>
      <span class="text-center mb-0 mr-2">{{ list.title }}</span>

      <template #append>
        <div class="inline-block ml-2">
          <EditList :list="list" />
          <DeleteList :list="list" />
        </div>
      </template>
    </PageHeading>
    <Background :icon="faCheckSquare" />

    <div :class="mergeClasses('flex', 'justify-end', 'gap-x-1', 'my-6')">
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
