<script setup lang="ts">
import List from "@/components/common/List.vue";
import { useRouter } from "vue-router";
import type { Board } from "@/data/models/Board";
import BoardGridElement from "./BoardGridElement.vue";

interface BoardGridProps {
  boards: Board[];
}

const props = defineProps<BoardGridProps>();
const router = useRouter();

const toBoard = (v: { element: Board }) =>
  router.push({
    name: "board",
    params: { id: v.element.id },
  });
</script>

<template>
  <List :elements="props.boards" @select="toBoard" class="q-mt-sm">
    <template #element="{ element }">
      <BoardGridElement :board="element" />
    </template>
  </List>
</template>
