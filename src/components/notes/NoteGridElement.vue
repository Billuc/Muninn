<script setup lang="ts">
import { NoteAndTag } from "@/data/models/Note";
import TagChip from "@/components/common/tags/TagChip.vue";

interface NoteGridElementProps {
  note: NoteAndTag;
}

const props = defineProps<NoteGridElementProps>();
</script>

<template>
  <div>{{ props.note.title }}</div>
  <QSpace />
  <TagChip :tag="props.note.tag" dense v-if="props.note.tag" />
</template>
