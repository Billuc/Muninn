<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { BoardService } from "@/data/services/boardService";
import { NoteService } from "@/data/services/noteService";
import { ListService } from "@/data/services/listService";
import { Board, CardType } from "@/data/models/Board";
import CardTypeSelect from "./CardTypeSelect.vue";
import _ from "lodash";
import { BoardOnlineService } from "@/data/services/boardOnlineService";
import { NoteOnlineService } from "@/data/services/noteOnlineService";
import { ListOnlineService } from "@/data/services/listOnlineService";

interface CreateCardProps {
  board: Board;
}

const boardOfflineService = useService(BoardService);
const boardOnlineService = useService(BoardOnlineService);
const noteOfflineService = useService(NoteService);
const noteOnlineService = useService(NoteOnlineService);
const listOfflineService = useService(ListService);
const listOnlineService = useService(ListOnlineService);

const props = defineProps<CreateCardProps>();

const boardService = props.board.online
  ? boardOnlineService
  : boardOfflineService;
const noteService = props.board.online ? noteOnlineService : noteOfflineService;
const listService = props.board.online ? listOnlineService : listOfflineService;

const dialogOpened = ref(false);
const cardType = ref(CardType.Note);
const creating = ref(false);

const createCard = async () => {
  creating.value = true;
  let card = { id: "" };

  switch (cardType.value) {
    case CardType.List:
      card = await listService.create({
        title: "New list",
      });
      break;
    case CardType.Note:
      card = await noteService.create({
        title: "New note",
        text: "",
        tagId: "",
      });
      break;
  }

  const updatedBoard = _.cloneDeep(props.board);
  updatedBoard.cards.push({ id: card.id, type: cardType.value });
  await boardService.update(updatedBoard);

  setTimeout(() => {
    creating.value = false;
    dialogOpened.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <QBtn
      icon="mdi-plus"
      color="primary"
      text-color="text"
      class="absolute card-add"
      round
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="createCard">
      <template #title>New Card</template>

      <template #form>
        <CardTypeSelect v-model="cardType" />
      </template>

      <template #actions>
        <QBtn type="reset" color="info">Clear</QBtn>
        <QBtn type="submit" color="positive" :loading="creating">Create</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
