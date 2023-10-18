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
  >
    <ListGridElement
      v-for="[id, list] in lists"
      :key="`list-${id}`"
      :list="list"
    />
    <CreateList />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useListStore } from "~/stores/listStore";
import ListGridElement from "./ListGridElement.vue";
import CreateList from "./CreateList.vue";

const store = useListStore();
const { lists } = storeToRefs(store);
</script>
