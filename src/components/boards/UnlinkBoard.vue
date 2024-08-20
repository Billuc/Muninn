<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { useRouter } from "vue-router";
import { Board } from "@/data/models/Board";
import { BoardOnlineService } from "@/data/services/boardOnlineService";

interface UnlinkBoardProps {
  board: Board;
}

const boardOnlineService = useService(BoardOnlineService);
const router = useRouter();

const props = defineProps<UnlinkBoardProps>();

const dialogOpened = ref(false);
const removing = ref(false);

const unlinkBoard = async () => {
  removing.value = true;

  await boardOnlineService.unlink(props.board.id);

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
      icon="mdi-link-variant-off"
      label="Unlink Board"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="unlinkBoard">
      <template #title>
        Are you sure you want to unlink board {{ props.board.title }}
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
