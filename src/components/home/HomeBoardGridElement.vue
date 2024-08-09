<script setup lang="ts">
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ID } from "@/data/models/ID";
import { computed, ref, watchEffect } from "vue";
import { BoardTagService } from "@/data/services/boardTagService";
import { Tag } from "@/data/models/Tag";
import { BoardService } from "@/data/services/boardService";
import BoardGridElement from "../boards/BoardGridElement.vue";

interface HomeBoardGridElementProps {
  id: ID;
}

const props = defineProps<HomeBoardGridElementProps>();
const boardService = useService(BoardService);
const boardTagService = useService(BoardTagService);

const boardData = await boardService.get(props.id);
const board = ref(boardData);
useSubscription(boardService, board);

const tagData = await boardTagService.get(board.value.tagId);
const boardTag = ref<Tag | null>(tagData ?? null);
useSubscription(boardTagService, boardTag);

const boardAndTag = computed(() => ({
  ...board.value,
  tag: boardTag.value,
}));

watchEffect(async () => {
  if (!board.value.tagId) {
    boardTag.value = null;
  }

  if (board.value.tagId && board.value.tagId !== boardTag.value?.id) {
    boardTag.value = await boardTagService.get(board.value.tagId);
  }
});
</script>

<template>
  <BoardGridElement :board="boardAndTag" v-if="board" />
</template>
