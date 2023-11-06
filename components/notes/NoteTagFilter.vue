<template>
  <LayoutLoading v-if="pending"/>
  <TagSelecter
    v-show="tags!.length"
    :tags="tags!"
    :selected="props.selected"
    label="Filter by Tag"
    @update:selected="selectTag"
    clearable
  />
</template>

<script setup lang="ts">
import { type ID } from "~/data/models/ID";
import { NoteTagService } from "~/data/services/noteTagService";

interface NoteTagFilterProps {
  selected: ID;
}

const props = defineProps<NoteTagFilterProps>();
const emit = defineEmits(["update:selected"]);
const noteTagService = useService(NoteTagService);

const { pending, data: tags } = useLazyAsyncData('note-tags', () => noteTagService.getAll());

const selectTag = (id: ID) => emit("update:selected", id);
</script>
