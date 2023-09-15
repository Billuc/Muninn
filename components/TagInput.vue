<template>
  <div class="dropdown w-full">
    <Autocomplete
      label="Tags"
      placeholder="Enter tag name..."
      :options="tagOptions"
      @input="onInput"
      @new-option="onNewTag"
      text-key="title"
      value-key="id"
    >
      <template #no-option v-if="props.strict"> No tag found... </template>
    </Autocomplete>

    <TagList class="mt-2" :tags="selectedTags" removable @remove="onRemove" />
  </div>
</template>

<script setup lang="ts">
import { Tag } from "~/models/Tag";
import Autocomplete from "./Autocomplete.vue";
import TagList from "./TagList.vue";

interface TagInputProps {
  tags: Tag[];
  selectedTagIds: number[];
  strict?: boolean;
}

const props = defineProps<TagInputProps>();
const emit = defineEmits(["newTag", "removeTag", "selectTag"]);
const selectedTags = computed(() =>
  props.tags.filter((t) => props.selectedTagIds.includes(t.id))
);
const tagOptions = computed(() =>
  props.tags.filter((t) => !selectedTags.value.includes(t))
);

const onInput = (v: string) => emit("selectTag", v);
const onRemove = (tag: Tag) => emit("removeTag", tag.id);
const onNewTag = (tagName: string) => emit("newTag", tagName);
</script>
