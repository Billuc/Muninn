<script setup lang="ts">
import PageAction from "@/components/common/PageAction.vue";
import { useService } from "@/composables/useService";
import { List } from "@/data/models/List";
import { ListService } from "@/data/services/listService";
import { computed, toRefs } from "vue";

interface HideCheckedToggleProps {
  list: List;
}

const props = defineProps<HideCheckedToggleProps>();
const service = useService(ListService);

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
  <PageAction
    :icon="icon"
    :label="label"
    @click="toggleHideChecked"
    color="primary"
  />
</template>
