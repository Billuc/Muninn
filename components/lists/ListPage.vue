<template>
  <ListVue :list="props.list" />
</template>

<script setup lang="ts">
import ListVue from "./ListVue.vue";
import { type List } from "~/data/models/List";

interface ListPageProps {
  list: List;
}

const props = defineProps<ListPageProps>();
</script>
