<template>
  <div class="flex items-center gap-x-4">
    <span class="flex-shrink-0">Filter by tag : </span>
    <TagInput
      strict
      :tags="tagArray"
      :selected-tag-ids="props.selected"
      @select-tag="selectTag"
      @remove-tag="removeTag"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNoteStore } from "~/stores/noteStore";

interface NoteTagFilterProps {
  selected: number[];
}

const props = defineProps<NoteTagFilterProps>();
const emit = defineEmits(["update:selected"]);
const store = useNoteStore();
const { tags } = storeToRefs(store);

const tagArray = computed(() => [...tags.value.values()]);

const selectTag = (id: number) =>
  emit("update:selected", [...props.selected, id]);
const removeTag = (id: number) =>
  emit(
    "update:selected",
    props.selected.filter((s) => s !== id)
  );
</script>
