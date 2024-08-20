<script setup lang="ts">
import type { BoardAndTag } from "@/data/models/Board";
import TagChip from "../common/tags/TagChip.vue";

interface BoardGridElementProps {
  board: BoardAndTag;
}

const props = defineProps<BoardGridElementProps>();
</script>

<template>
  <div>
    {{ props.board.title }}
    <QBadge color="primary" v-if="props.board.online" class="q-ml-xs">
      <QIcon name="mdi-wifi" />
    </QBadge>
  </div>
  <QSpace />
  <TagChip :tag="props.board.tag" dense v-if="props.board.tag" />
</template>
