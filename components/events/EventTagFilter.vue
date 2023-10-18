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
import { ID } from "~/models/ID";
import TagSelecter from "../TagSelecter.vue";
import { useEventStore } from "~/stores/eventStore";

interface EventTagFilterProps {
  selected: ID;
}

const props = defineProps<EventTagFilterProps>();
const emit = defineEmits(["update:selected"]);
const store = useEventStore();
const tags = store.tagArray;

const selectTag = (id: ID) => emit("update:selected", id);
</script>
