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
import { useListStore } from "~/stores/listStore";
import { List } from "~/models/List";

interface ShowCheckedToggleProps {
  list: List;
}

const props = defineProps<ShowCheckedToggleProps>();
const store = useListStore();

const onClick = () => store.toggleChecked(props.list.id);
</script>
