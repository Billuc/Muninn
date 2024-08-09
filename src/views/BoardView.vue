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

const boardService = useService(BoardService);
// const noteTagService = useService(NoteTagService);
const route = useRoute();
const boardId = getOneParam(route.params.id);

const boardData = await boardService.get(boardId);
const board = ref(boardData);
useSubscription(boardService, board);

// board.value = {
//   id: "1",
//   tagId: "",
//   title: "test",
//   cards: [
//     { id: "5", type: CardType.List },
//     { id: "6", type: CardType.Note },
//   ],
// };

// const tagData = await noteTagService.get(board.value.tagId);
// const noteTag = ref<Tag | null>(tagData);

// const noteText = ref(board.value.text);

// watch([board], async () => {
//   if (!board.value.tagId) {
//     noteTag.value = null;
//     return;
//   }
//   if (board.value.tagId == noteTag.value?.id) return;

//   noteTag.value = await noteTagService.get(board.value.tagId);
// });
</script>

<template>
  <div>
    <Title>
      <template #prefix><BackButton name="boards" /></template>
      <template #text>{{ board.title }}</template>
      <template #suffix>
        <!-- <TagChip :tag="noteTag" no-text v-if="noteTag" /> -->
      </template>
    </Title>

    <PageActions>
      <FavoriteToggle :id="boardId" :type="FavoriteType.Board" />
      <EditBoard :board="board" />
      <DeleteBoard :board="board" />
    </PageActions>

    <CardsDisplay :cards="board.cards" />
  </div>
</template>
