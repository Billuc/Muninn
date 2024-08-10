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

interface CreateCardProps {
  board: Board;
}

const dialogOpened = ref(false);
const boardService = useService(BoardService);
const noteService = useService(NoteService);
const listService = useService(ListService);

const props = defineProps<CreateCardProps>();

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
