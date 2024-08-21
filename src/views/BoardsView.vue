<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { computed, ref } from "vue";
import { BoardService } from "@/data/services/boardService";
import BoardGrid from "@/components/boards/BoardGrid.vue";
import CreateBoard from "@/components/boards/CreateBoard.vue";
import ManageBoardTags from "@/components/boards/ManageBoardTags.vue";
import { BoardTagService } from "@/data/services/boardTagService";
import ImportNewBoard from "@/components/boards/ImportNewBoard.vue";

const boardService = useService(BoardService);
const boardTagService = useService(BoardTagService);

const boardsData = await boardService.getAll();
const boards = ref(boardsData);
useSubscription(boardService, boards);

const tagsData = await boardTagService.getAll();
const boardTags = ref(tagsData);
useSubscription(boardTagService, boardTags);

const boardsAndTags = computed(() =>
  boards.value.map((n) => ({
    ...n,
    tag: boardTags.value.find((t) => t.id == n.tagId) ?? null,
  }))
);
</script>

<template>
  <div>
    <Title>
      <template #text>Boards</template>
    </Title>

    <PageActions>
      <CreateBoard />
      <ManageBoardTags />
      <ImportNewBoard />
    </PageActions>

    <BoardGrid :boards="boardsAndTags" />
  </div>
</template>
