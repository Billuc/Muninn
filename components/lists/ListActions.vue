<template>
  <Actions>
    <ListsEditList :list="props.list" />
    <ListsDeleteList :list="props.list" />

    <ListsShowCheckedToggle :list="props.list" />
    <ListsClearCheckedButton :list="props.list" />
  </Actions>
</template>

<script setup lang="ts">
import { type List } from "~/data/models/List";

interface ListActionsProps {
  list: List;
}

const props = defineProps<ListActionsProps>();
</script>
