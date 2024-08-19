<script setup lang="ts">
import { useService } from "@/composables/useService";
import { List } from "@/data/models/List";
import { ListService } from "@/data/services/listService";
import { computed, toRefs } from "vue";
import CardActionBase from "../boards/CardActionBase.vue";
import { ListOnlineService } from "@/data/services/listOnlineService";

interface HideCheckedToggleProps {
  list: List;
  online: boolean;
}

const props = defineProps<HideCheckedToggleProps>();
const service = props.online
  ? useService(ListOnlineService)
  : useService(ListService);

const { list } = toRefs(props);

const hideChecked = computed(() => list.value.hideChecked);
const icon = computed(() => (hideChecked.value ? "mdi-eye" : "mdi-eye-off"));
const label = computed(() =>
  hideChecked.value ? "Show checked" : "Hide checked"
);

const toggleHideChecked = async () => {
  await service.update({
    ...list.value,
    hideChecked: !hideChecked.value,
  });
};
</script>

<template>
  <CardActionBase
    :icon="icon"
    :tooltip="label"
    @click="toggleHideChecked"
    color="secondary"
  />
</template>
