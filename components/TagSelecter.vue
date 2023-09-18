<template>
  <div class="flex items-center gap-x-2 overflow-x-auto p-2">
    <div class="font-bold">{{ props.label ?? "Tag :" }}</div>
    <TagVue
      v-for="tag in props.tags"
      :color="tag.color"
      :icon="tag.icon"
      :text="tag.title"
      @click="() => selectTag(tag.id)"
      :class="{
        'outline outline-2 outline-offset-1 outline-neutral':
          props.selected === tag.id,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import TagVue from "./Tag.vue";
import { Tag } from "~/models/Tag";

interface TagSelecterProps {
  selected: number;
  label?: string;
  tags: Tag[];
}

const props = defineProps<TagSelecterProps>();
const emit = defineEmits(["update:selected"]);

const selectTag = (id: number) => {
  if (props.selected === id) emit("update:selected", -1);
  else emit("update:selected", id);
};
</script>
