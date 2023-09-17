<template>
  <ul
    :class="
      mergeClasses('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-1', 'p-0')
    "
  >
    <ListGridElement
      v-for="[id, list] in lists"
      :key="`list-${list.id}`"
      :label="list.title"
      :href="`/lists/${list.id}`"
    />
    <CreateList />
  </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useListStore } from "~/stores/listStore";
import ListGridElement from "./ListGridElement.vue";
import CreateList from "./CreateList.vue";

const store = useListStore();
const { lists } = storeToRefs(store);
</script>
