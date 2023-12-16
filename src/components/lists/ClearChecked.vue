<script setup lang="ts">
import PageAction from "@/components/common/PageAction.vue";
import { List } from "@/data/models/List";

interface ClearCheckedProps {
  list: List;
}

const props = defineProps<ClearCheckedProps>();

const clearChecked = () => {};
</script>

<template>
  <PageAction
    icon="mdi-broom"
    label="Clear checked"
    @click="clearChecked"
    color="primary"
  />
</template>
