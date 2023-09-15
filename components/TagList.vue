<template>
  <div :class="mergeClasses('flex', 'gap-x-2')">
    <TagEl
      v-for="tag in props.tags"
      :key="'tag-' + tag.id"
      :text="tag.title"
      :color="tag.color"
      :icon="tag.icon"
    >
      <FontAwesomeIcon
        v-if="removable"
        :icon="faRemove"
        size="xs"
        class="cursor-pointer ml-1"
        @click="() => onRemove(tag)"
      />
    </TagEl>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TagEl from "./Tag.vue";
import { Tag } from "~/models/Tag";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

interface TagListProps {
  tags: Tag[];
  removable?: boolean;
}

const props = defineProps<TagListProps>();
const emit = defineEmits(["remove"]);

const onRemove = (tag: Tag) => emit("remove", tag);
</script>
