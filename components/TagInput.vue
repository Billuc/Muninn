<template>
  <div class="dropdown">
    <Autocomplete
      label="Tag name"
      :options="props.tags"
      @input="onInput"
      @new-option="onNewTag"
      text-key="title"
      value-key="id"
    ></Autocomplete>

    <div :class="mergeClasses('flex')">
      <TagEl
        v-for="tag in selectedTags"
        :key="'tag-' + tag.id"
        :text="tag.title"
        :color="tag.color"
        :icon="tag.icon"
      >
        <FontAwesomeIcon
          :icon="faRemove"
          size="xs"
          class="btn btn-circle btn-xs"
          @click="onRemove(tag)"
        />
      </TagEl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tag } from "~/models/Tag";
import TagEl from "./Tag.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import Autocomplete from "./Autocomplete.vue";

interface TagInputProps {
  tags: Tag[];
  selectedTagIds: number[];
}

const props = defineProps<TagInputProps>();
const emit = defineEmits(["newTag", "removeTag", "selectTag"]);
const selectedTags = computed(() =>
  props.tags.filter((t) => props.selectedTagIds.includes(t.id))
);

const onInput = (v: string) => emit("selectTag", v);
const onRemove = (tag: Tag) => emit("removeTag", tag.id);
const onNewTag = (tagName: string) => emit("newTag", tagName);
</script>
