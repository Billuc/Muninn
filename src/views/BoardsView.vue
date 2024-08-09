<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ref } from "vue";
import { BoardService } from "@/data/services/boardService";
import BoardGrid from "@/components/boards/BoardGrid.vue";
import CreateBoard from "@/components/boards/CreateBoard.vue";

const boardService = useService(BoardService);
// const noteTagService = useService(NoteTagService);

const boards = await boardService.getAll();
const data = ref(boards);
useSubscription(boardService, data);
</script>

<template>
  <div>
    <Title>
      <template #text>Boards</template>
    </Title>

    <PageActions>
      <CreateBoard />
    </PageActions>

    <BoardGrid :boards="data" />
  </div>
</template>
