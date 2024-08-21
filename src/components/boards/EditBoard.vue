<script setup lang="ts">
import BoardForm from "./BoardForm.vue";
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { BoardService } from "@/data/services/boardService";
import type { Board } from "@/data/models/Board";
import _ from "lodash";
import { BoardOnlineService } from "@/data/services/boardOnlineService";

interface EditBoardProps {
  board: Board;
}

const props = defineProps<EditBoardProps>();

const boardService = props.board.online
  ? useService(BoardOnlineService)
  : useService(BoardService);

const dialogOpened = ref(false);
const name = ref(props.board.title);
const tagId = ref(props.board.tagId);
const updating = ref(false);

const editBoard = async () => {
  updating.value = true;

  const updatedBoard = _.cloneDeep(props.board);
  updatedBoard.title = name.value;
  updatedBoard.tagId = tagId.value;

  await boardService.update(updatedBoard);

  setTimeout(() => {
    updating.value = false;
    dialogOpened.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <PageAction
      color="secondary"
      icon="mdi-pen"
      label="Edit Board"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="editBoard">
      <template #title>Edit {{ props.board.title }}</template>

      <template #form>
        <BoardForm v-model:title="name" v-model:tag-id="tagId" />
      </template>

      <template #actions>
        <QBtn type="reset" color="info">Clear</QBtn>
        <QBtn type="submit" color="positive" :loading="updating">Save</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
