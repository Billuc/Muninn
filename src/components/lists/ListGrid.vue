<script setup lang="ts">
import { List } from "@/data/models/List";
import ListGridElement from "./ListGridElement.vue";

interface ListGridProps {
  lists: List[];
}

const props = defineProps<ListGridProps>();
</script>

<template>
  <div class="row wrap justify-start items-start content-start q-pa-sm">
    <template v-if="props.lists.length > 0">
      <ListGridElement
        v-for="list in props.lists"
        :list="list"
        :key="list.id"
      />
    </template>
    <div v-else>No list yet</div>
  </div>
</template>
