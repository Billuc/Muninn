<script setup lang="ts">
import { Board, CardType } from "@/data/models/Board";
import ListCard from "./ListCard.vue";
import NoteCard from "./NoteCard.vue";
import CreateCard from "./CreateCard.vue";
import { useService } from "@/composables/useService";
import { BoardService } from "@/data/services/boardService";
import _ from "lodash";
import { BoardOnlineService } from "@/data/services/boardOnlineService";

interface CardsDisplayProps {
  board: Board;
  noEdit?: boolean;
}

const boardService = useService(BoardService);
const boardOnlineService = useService(BoardOnlineService);

const props = defineProps<CardsDisplayProps>();

const service = props.board.online ? boardOnlineService : boardService;

const onUp = async (index: number) => {
  if (index == 0) return;

  const updatedBoard = _.cloneDeep(props.board);
  updatedBoard.cards.splice(index + 1, 0, updatedBoard.cards[index - 1]);
  updatedBoard.cards.splice(index - 1, 1);

  await service.update(updatedBoard);
};
const onDown = async (index: number) => {
  if (index == props.board.cards.length - 1) return;

  const updatedBoard = _.cloneDeep(props.board);
  updatedBoard.cards.splice(index + 2, 0, updatedBoard.cards[index]);
  updatedBoard.cards.splice(index, 1);

  await service.update(updatedBoard);
};
</script>

<template>
  <div class="cards-display content-display q-my-md">
    <template v-for="(c, i) of props.board.cards" :key="c.id">
      <ListCard
        v-if="c.type == CardType.List"
        :id="c.id"
        :online="props.board.online"
        :no-edit="props.noEdit"
        @up="() => onUp(i)"
        @down="() => onDown(i)"
      />
      <NoteCard
        v-if="c.type == CardType.Note"
        :id="c.id"
        :online="props.board.online"
        :no-edit="props.noEdit"
        @up="() => onUp(i)"
        @down="() => onDown(i)"
      />
    </template>

    <CreateCard :board="board" v-if="!props.noEdit" />
  </div>
</template>

<style>
.cards-display {
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  position: relative;
}

.card-add {
  bottom: -1rem;
  right: -1rem;
}
</style>
