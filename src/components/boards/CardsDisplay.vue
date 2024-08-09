<script setup lang="ts">
import { CardType, type Card } from "@/data/models/Board";
import ListCard from "./ListCard.vue";
import NoteCard from "./NoteCard.vue";

interface CardsDisplayProps {
  cards: Card[];
}

const props = defineProps<CardsDisplayProps>();
</script>

<template>
  <div class="cards-display">
    <template v-for="(c, i) of props.cards" :key="i">
      <ListCard v-if="c.type == CardType.List" :id="c.id" />
      <NoteCard v-if="c.type == CardType.Note" :id="c.id" />
    </template>
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
</style>
