<template>
  <div :class="mergeClasses('flex', 'flex-wrap', 'gap-2')">
    <TagEl
      v-for="tag in props.tags"
      :key="'tag-' + tag.id"
      :text="tag.title"
      :color="tag.color"
      :icon="tag.icon"
    >
      <FontAwesomeIcon
        v-if="editable"
        :icon="faPen"
        size="xs"
        class="cursor-pointer ml-1"
        @click="() => onEdit(tag)"
      />
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
import { faPen, faRemove } from "@fortawesome/free-solid-svg-icons";

interface TagListProps {
  tags: Tag[];
  removable?: boolean;
  editable?: boolean;
}

const props = defineProps<TagListProps>();
const emit = defineEmits(["remove", "edit"]);

const onRemove = (tag: Tag) => emit("remove", tag);
const onEdit = (tag: Tag) => emit("edit", tag);
</script>
