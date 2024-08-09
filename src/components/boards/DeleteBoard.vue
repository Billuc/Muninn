<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { useRouter } from "vue-router";
import { Board } from "@/data/models/Board";
import { BoardService } from "@/data/services/boardService";

interface DeleteBoardProps {
  board: Board;
}

const props = defineProps<DeleteBoardProps>();

const dialogOpened = ref(false);
const boardService = useService(BoardService);
const router = useRouter();

const removing = ref(false);

const deleteBoard = async () => {
  removing.value = true;
  await boardService.remove(props.board.id);

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
        <QBtn :loading="removing" @click="dialogOpened = false">No</QBtn>
        <QBtn type="submit" :loading="removing">Yes</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
