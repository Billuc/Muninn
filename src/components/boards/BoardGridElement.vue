<script setup lang="ts">
import type { Board } from "@/data/models/Board";

interface BoardGridElementProps {
  board: Board;
}

const props = defineProps<BoardGridElementProps>();
</script>

<template>
  <div>{{ props.board.title }}</div>
  <QSpace />
  <!-- <TagChip :tag="props.note.tag" dense v-if="props.note.tag" /> -->
</template>
