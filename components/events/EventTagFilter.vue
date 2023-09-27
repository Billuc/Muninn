<template>
  <TagSelecter
    :tags="tags"
    :selected="props.selected"
    label="Filter by Tag"
    @update:selected="selectTag"
    clearable
  />
</template>

<script setup lang="ts">
import TagSelecter from "../TagSelecter.vue";
import { useEventStore } from "~/stores/eventStore";

interface EventTagFilterProps {
  selected: number;
}

const props = defineProps<EventTagFilterProps>();
const emit = defineEmits(["update:selected"]);
const store = useEventStore();
const tags = store.tagArray;

const selectTag = (id: number) => emit("update:selected", id);
</script>
