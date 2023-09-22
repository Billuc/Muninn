<template>
  <div class="flex flex-wrap items-center justify-center gap-2 p-2">
    <div class="font-bold whitespace-nowrap">{{ props.label ?? "Tag :" }}</div>
    <TagVue
      v-for="tag in orderedTags"
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
import { Tag, TagOrder } from "~/models/Tag";
import _ from "lodash";

interface TagSelecterProps {
  selected: number;
  label?: string;
  tags: Tag[];
}

const props = defineProps<TagSelecterProps>();
const emit = defineEmits(["update:selected"]);

const orderedTags = computed(() =>
  _.sortBy(props.tags, (t) => TagOrder.get(t.color))
);

const selectTag = (id: number) => {
  if (props.selected === id) emit("update:selected", -1);
  else emit("update:selected", id);
};
</script>
