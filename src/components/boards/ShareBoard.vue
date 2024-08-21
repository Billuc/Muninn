<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import type { Board } from "@/data/models/Board";
import { BoardUploadService } from "@/data/services/boardUploadService";
import shortUUID from "short-uuid";

interface ShareBoardProps {
  board: Board;
}

const props = defineProps<ShareBoardProps>();
const boardUploadService = useService(BoardUploadService);

const uploadDialogOpened = ref(false);
const linkDialogOpened = ref(false);
const uploading = ref(false);
const copiedTooltip = ref(false);

const boardCode = shortUUID().fromUUID(props.board.id);

const openDialog = () => {
  if (props.board.online) linkDialogOpened.value = true;
  else uploadDialogOpened.value = true;
};

const uploadBoard = async () => {
  uploading.value = true;

  await boardUploadService.upload(props.board.id);

  setTimeout(() => {
    uploading.value = false;
    uploadDialogOpened.value = false;
    linkDialogOpened.value = true;
  }, 100);
};

const copyCode = async () => {
  copiedTooltip.value = false;
  await navigator.clipboard.writeText(boardCode);
  copiedTooltip.value = true;

  setTimeout(() => (copiedTooltip.value = false), 3000);
};
</script>

<template>
  <div>
    <PageAction
      color="secondary"
      icon="mdi-share-variant"
      label="Share Board"
      @click="openDialog"
    />

    <FormDialog v-model="uploadDialogOpened" @submit="uploadBoard">
      <template #title>
        Do you want to share board {{ props.board.title }} ? It will be
        converted to an online board and you won't be able to undo this !
      </template>

      <template #actions>
        <QBtn
          :loading="uploading"
          @click="uploadDialogOpened = false"
          color="secondary"
        >
          No
        </QBtn>
        <QBtn type="submit" :loading="uploading" color="primary">Yes</QBtn>
      </template>
    </FormDialog>

    <FormDialog v-model="linkDialogOpened" @submit="linkDialogOpened = false">
      <template #title>
        <div class="text-center">
          <div class="text-h6">
            Your board has been uploaded and can be shared !
          </div>
          <div class="text-subtitle1">
            Here is the code :
            <span class="text-weight-bold" style="word-break: break-all">{{
              boardCode
            }}</span>
            <QBtn
              icon="mdi-content-copy"
              @click="copyCode"
              class="q-ml-sm"
              size="sm"
            >
              Copy
              <QTooltip v-model="copiedTooltip" anchor="top middle">
                Copied !
              </QTooltip>
            </QBtn>
          </div>
        </div>
      </template>

      <template #actions>
        <QBtn type="submit" color="primary" text-color="primary-text">
          Close
        </QBtn>
      </template>
    </FormDialog>
  </div>
</template>
