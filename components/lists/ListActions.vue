<template>
  <Actions>
    <EditList :list="props.list" />
    <DeleteList :list="props.list" />

    <ShowCheckedToggle :list="props.list" />
    <ClearCheckedButton :list="props.list" />
  </Actions>
</template>

<script setup lang="ts">
import { List } from "~/data/models/List";
import ShowCheckedToggle from "./ShowCheckedToggle.vue";
import ClearCheckedButton from "./ClearCheckedButton.vue";
import Actions from "../Actions.vue";
import EditList from "./EditList.vue";
import DeleteList from "./DeleteList.vue";

interface ListActionsProps {
  list: List;
}

const props = defineProps<ListActionsProps>();
</script>
