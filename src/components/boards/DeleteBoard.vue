<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { useRouter } from "vue-router";
import { Board, CardType } from "@/data/models/Board";
import { BoardService } from "@/data/services/boardService";
import { NoteService } from "@/data/services/noteService";
import { ListService } from "@/data/services/listService";
import _ from "lodash";

interface DeleteBoardProps {
  board: Board;
}

const boardService = useService(BoardService);
const noteService = useService(NoteService);
const listService = useService(ListService);
const router = useRouter();

const props = defineProps<DeleteBoardProps>();

const dialogOpened = ref(false);
const removing = ref(false);

const deleteBoard = async () => {
  removing.value = true;

  const cardsToDelete = _.cloneDeep(props.board.cards);

  await boardService.remove(props.board.id);

  for (let card of cardsToDelete) {
    switch (card.type) {
      case CardType.List:
        await listService.remove(card.id);
        break;
      case CardType.Note:
        await noteService.remove(card.id);
        break;
    }
  }

  setTimeout(() => {
    removing.value = false;
    dialogOpened.value = false;
    router.push({ name: "boards" });
  }, 100);
};
</script>

<template>
  <div>
    <PageAction
      color="secondary"
      icon="mdi-delete"
      label="Delete Board"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="deleteBoard">
      <template #title>
        Are you sure you want to delete board {{ props.board.title }}
      </template>

      <template #actions>
        <QBtn
          :loading="removing"
          @click="dialogOpened = false"
          color="secondary"
        >
          No
        </QBtn>
        <QBtn type="submit" :loading="removing" color="primary">Yes</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
