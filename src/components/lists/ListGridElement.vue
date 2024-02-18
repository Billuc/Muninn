<script setup lang="ts">
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { List } from "@/data/models/List";
import { ListElementService } from "@/data/services/listElementService";
import { computed, ref } from "vue";

interface ListGridElementProps {
  list: List;
}

const props = defineProps<ListGridElementProps>();
const listElementService = useService(ListElementService);

const listElementsData = await listElementService.getAllChildren(props.list.id);
const listElements = ref(listElementsData);
useSubscription(
  listElementService,
  listElements,
  (el) => el.listId === props.list.id && el.parentId === ""
);

const completion = computed(
  () =>
    (100 * listElements.value.filter((el) => el.done).length) /
    (listElements.value.length || 1)
);
</script>

<template>
  <div class="text-uppercase">{{ props.list.title }}</div>
  <QSpace />
  <QKnob
    :max="100"
    :model-value="completion"
    size="xs"
    color="primary"
    track-color="secondary"
    :thickness="0.4"
  />
</template>
