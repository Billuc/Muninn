<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import BackButton from "@/components/common/BackButton.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getOneParam } from "@/utils/route";
import TagChip from "@/components/common/tags/TagChip.vue";
import { Tag } from "@/data/models/Tag";
import { BoardService } from "@/data/services/boardService";
import CardsDisplay from "@/components/boards/CardsDisplay.vue";
import { FavoriteType } from "@/data/models/Favorite";
import EditBoard from "@/components/boards/EditBoard.vue";
import DeleteBoard from "@/components/boards/DeleteBoard.vue";
import FavoriteToggle from "@/components/common/favorites/FavoriteToggle.vue";
import { BoardTagService } from "@/data/services/boardTagService";
import { BoardOnlineService } from "@/data/services/boardOnlineService";
import UnlinkBoard from "@/components/boards/UnlinkBoard.vue";

const boardService = useService(BoardService);
const boardOnlineService = useService(BoardOnlineService);
const boardTagService = useService(BoardTagService);

const route = useRoute();
const boardId = getOneParam(route.params.id);

let boardData = await boardService.get(boardId);
if (boardData.online) boardData = await boardOnlineService.get(boardId);
const board = ref(boardData);
useSubscription(boardService, board);

const tagData = await boardTagService.get(board.value.tagId);
const boardTag = ref<Tag | null>(tagData);

watch([board], async () => {
  if (!board.value?.tagId) {
    boardTag.value = null;
    return;
  }
  if (board.value.tagId == boardTag.value?.id) return;

  boardTag.value = await boardTagService.get(board.value.tagId);
});
</script>

<template>
  <div v-if="board">
    <Title>
      <template #prefix><BackButton name="boards" /></template>
      <template #text>{{ board.title }}</template>
      <template #suffix>
        <TagChip :tag="boardTag" no-text v-if="boardTag" />
      </template>
    </Title>

    <PageActions>
      <FavoriteToggle :id="boardId" :type="FavoriteType.Board" />
      <EditBoard :board="board" />
      <UnlinkBoard :board="board" v-if="board.online" />
      <DeleteBoard :board="board" v-else />
    </PageActions>

    <CardsDisplay :board="board" />
  </div>
</template>
