<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { ID } from "@/data/models/ID";
import { BoardService } from "@/data/services/boardService";
import BoardForm from "./BoardForm.vue";

const dialogOpened = ref(false);
const boardService = useService(BoardService);

const name = ref("");
const tagId = ref<ID>("");
const creating = ref(false);

const createNote = async () => {
  creating.value = true;
  await boardService.create({
    title: name.value,
    tagId: tagId.value,
  });

  setTimeout(() => {
    creating.value = false;
    dialogOpened.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <PageAction
      color="secondary"
      icon="mdi-plus"
      label="Add board"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="createNote">
      <template #title>New Board</template>

      <template #form>
        <BoardForm v-model:title="name" v-model:tag-id="tagId" />
      </template>

      <template #actions>
        <QBtn type="reset" color="info">Clear</QBtn>
        <QBtn type="submit" color="positive" :loading="creating">Create</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
