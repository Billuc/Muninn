<template>
  <TagSelecter
    v-show="tags.length"
    :tags="tags"
    :selected="props.selected"
    @update:selected="selectTag"
  />
</template>

<script setup lang="ts">
import { useNoteStore } from "~/stores/noteStore";
import TagSelecter from "../TagSelecter.vue";

interface NoteTagFilterProps {
  selected: number;
}

const props = defineProps<NoteTagFilterProps>();
const emit = defineEmits(["update:selected"]);
const store = useNoteStore();
const tags = store.tagArray

const selectTag = (id: number) => emit("update:selected", id);
</script>
