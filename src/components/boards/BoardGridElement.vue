<script setup lang="ts">
import type { BoardAndTag } from "@/data/models/Board";
import TagChip from "../common/tags/TagChip.vue";

interface BoardGridElementProps {
  board: BoardAndTag;
}

const props = defineProps<BoardGridElementProps>();
</script>

<template>
  <div>{{ props.board.title }}</div>
  <QSpace />
  <TagChip :tag="props.board.tag" dense v-if="props.board.tag" />
</template>
