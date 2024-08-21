<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import { useService } from "@/composables/useService";
import { useRoute } from "vue-router";
import { getOneParam } from "@/utils/route";
import CardsDisplay from "@/components/boards/CardsDisplay.vue";
import { BoardOnlineService } from "@/data/services/boardOnlineService";
import shortUUID from "short-uuid";
import ImportBoard from "@/components/boards/ImportBoard.vue";

const boardOnlineService = useService(BoardOnlineService);

const route = useRoute();
const boardShortId = getOneParam(route.params.id);
const boardId = shortUUID().validate(boardShortId)
  ? shortUUID().toUUID(boardShortId)
  : boardShortId;

const board = await boardOnlineService.get(boardId);
</script>

<template>
  <div v-if="board">
    <Title>
      <template #text>{{ board.title }}</template>
    </Title>

    <PageActions>
      <ImportBoard :board="board" />
    </PageActions>

    <CardsDisplay :board="board" :no-edit="true" />
  </div>
</template>
