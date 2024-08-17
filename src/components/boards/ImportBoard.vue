<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import type { Board } from "@/data/models/Board";
import _ from "lodash";
import { BoardOnlineService } from "@/data/services/boardOnlineService";

interface ImportBoardProps {
  board: Board;
}

const props = defineProps<ImportBoardProps>();

const dialogOpened = ref(false);
const boardOnlineService = useService(BoardOnlineService);
const importing = ref(false);

const importBoard = async () => {
  importing.value = true;

  await boardOnlineService.import(props.board.id);

  setTimeout(() => {
    importing.value = false;
    dialogOpened.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <PageAction
      color="secondary"
      icon="mdi-pen"
      label="Import this Board"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="importBoard">
      <template #title>
        Do you want to import board {{ props.board.title }}
      </template>

      <template #actions>
        <QBtn
          :loading="importing"
          @click="dialogOpened = false"
          color="secondary"
        >
          No
        </QBtn>
        <QBtn type="submit" :loading="importing" color="primary">Yes</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
