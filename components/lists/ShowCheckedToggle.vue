<template>
  <Action
    :icon="props.list.hideChecked ? faEye : faEyeSlash"
    :label="props.list.hideChecked ? 'Show checked' : 'Hide checked'"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Action from "../Action.vue";
import { List } from "~/data/models/List";
import { ListService } from "~/data/services/listService";

interface ShowCheckedToggleProps {
  list: List;
}

const props = defineProps<ShowCheckedToggleProps>();
const service = useService(ListService);

const onClick = async () => {
  await service.update({
    id: props.list.id,
    title: props.list.title,
    hideChecked: !props.list.hideChecked,
  });
};
</script>
