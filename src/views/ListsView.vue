<script setup lang="ts">
import ListGrid from "@/components/lists/ListGrid.vue";
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import CreateList from "@/components/lists/CreateList.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ListService } from "@/data/services/listService";
import { ref } from "vue";

const listService = useService(ListService);

const lists = await listService.getAll();
const data = ref(lists);
useSubscription(listService, data);
</script>

<template>
  <div>
    <Title>
      <template #text>Lists</template>
    </Title>

    <PageActions>
      <CreateList />
    </PageActions>

    <ListGrid :lists="data" />
  </div>
</template>
