<template>
  <TagSelecter
    v-show="tags.length"
    :tags="tags"
    :selected="props.selected"
    label="Filter by Tag"
    @update:selected="selectTag"
    clearable
  />
</template>

<script setup lang="ts">
import { useNoteStore } from "~/stores/noteStore";
import TagSelecter from "../TagSelecter.vue";
import { ID } from "~/models/ID";

interface NoteTagFilterProps {
  selected: ID;
}

const props = defineProps<NoteTagFilterProps>();
const emit = defineEmits(["update:selected"]);
const store = useNoteStore();
const tags = store.tagArray

const selectTag = (id: ID) => emit("update:selected", id);
</script>
