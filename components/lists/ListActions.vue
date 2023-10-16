<template>
  <div :class="mergeClasses('flex', 'justify-center', 'gap-x-2')">
    <ShowCheckedToggle
      :hide-checked="props.hideChecked"
      @update:hide-checked="onHideChecked"
    />
    <ClearCheckedButton :list="props.list" />
  </div>
</template>

<script setup lang="ts">
import { List } from "~/models/List";
import ShowCheckedToggle from "./ShowCheckedToggle.vue";
import ClearCheckedButton from "./ClearCheckedButton.vue";

interface ListActionsProps {
  hideChecked: boolean;
  list: List;
}

const props = defineProps<ListActionsProps>();
const emit = defineEmits(["update:hideChecked"]);

const onHideChecked = (v: boolean) => emit("update:hideChecked", v);
</script>
