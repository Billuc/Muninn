<script setup lang="ts">
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ID } from "@/data/models/ID";
import { computed, ref, watchEffect } from "vue";
import NoteGridElement from "../notes/NoteGridElement.vue";
import { NoteTagService } from "@/data/services/noteTagService";
import { Tag } from "@/data/models/Tag";
import { BoardService } from "@/data/services/boardService";
import BoardGridElement from "../boards/BoardGridElement.vue";

interface HomeBoardGridElementProps {
  id: ID;
}

const props = defineProps<HomeBoardGridElementProps>();
const boardService = useService(BoardService);
// const noteTagService = useService(NoteTagService);

const boardData = await boardService.get(props.id);
const board = ref(boardData);
useSubscription(boardService, board);

// const tagData = await noteTagService.get(note.value.tagId);
// const noteTag = ref<Tag | null>(tagData ?? null);
// useSubscription(noteTagService, noteTag);

// const noteAndTag = computed(() => ({
//   ...note.value,
//   tag: noteTag.value,
// }));

// watchEffect(async () => {
//   if (!note.value.tagId) {
//     noteTag.value = null;
//   }

//   if (note.value.tagId && note.value.tagId !== noteTag.value?.id) {
//     noteTag.value = await noteTagService.get(note.value.tagId);
//   }
// });
</script>

<template>
  <BoardGridElement :board="board" v-if="board" />
</template>
