<script setup lang="ts">
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ID } from "@/data/models/ID";
import { ListService } from "@/data/services/listService";
import { ref } from "vue";
import ListGridElement from "../lists/ListGridElement.vue";

interface HomeListGridElementProps {
  id: ID;
}

const props = defineProps<HomeListGridElementProps>();
const listService = useService(ListService);

const listData = await listService.get(props.id);
const list = ref(listData);
useSubscription(listService, list);
</script>

<template>
  <ListGridElement :list="list" v-if="list" />
</template>
