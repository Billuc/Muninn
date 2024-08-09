<script setup lang="ts">
import { Board, CardType, type Card } from "@/data/models/Board";
import ListCard from "./ListCard.vue";
import NoteCard from "./NoteCard.vue";
import CreateCard from "./CreateCard.vue";

interface CardsDisplayProps {
  board: Board;
}

const props = defineProps<CardsDisplayProps>();
</script>

<template>
  <div class="cards-display q-my-md">
    <template v-for="(c, i) of props.board.cards" :key="i">
      <ListCard v-if="c.type == CardType.List" :id="c.id" />
      <NoteCard v-if="c.type == CardType.Note" :id="c.id" />
    </template>

    <CreateCard :board="board" />
  </div>
</template>

<style>
.cards-display {
  width: 66%;
  margin-inline: auto;
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  position: relative;
}

.card-add {
  bottom: -0.5rem;
  right: -0.5rem;
}
</style>
