<template>
  <ListVue :list="props.list" />
</template>

<script setup lang="ts">
import ListVue from "./ListVue.vue";
import { List } from "~/models/List";

interface ListPageProps {
  list: List;
}

const props = defineProps<ListPageProps>();
</script>
