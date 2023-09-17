<template>
  <div>
    <PageHeading>
      <span class="text-center text-primary mb-0 mr-2">{{
        list.title
      }}</span>

      <template #append>
        <div class="inline-block ml-2">
          <EditList :list="list" />
          <DeleteList :list="list" />
        </div>
      </template>
    </PageHeading>

    <div :class="mergeClasses('flex', 'justify-end', 'my-6')">
      <Toggle
        label="Show checked"
        :value="showChecked"
        @input="(v) => (showChecked = v)"
        toggle-class="toggle-primary"
        class="w-fit"
      />
      <ClearCheckedButton :list="list" />
    </div>

    <ListVue :show-checked="showChecked" :list="list" />
  </div>
</template>

<script setup lang="ts">
import Toggle from "~/components/Toggle.vue";
import PageHeading from "~/components/layout/PageHeading.vue";
import ClearCheckedButton from "~/components/lists/ClearCheckedButton.vue";
import DeleteList from "~/components/lists/DeleteList.vue";
import EditList from "~/components/lists/EditList.vue";
import ListVue from "~/components/lists/ListVue.vue";
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
