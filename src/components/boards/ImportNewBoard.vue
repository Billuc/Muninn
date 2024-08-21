<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { required } from "@/utils/rules";
import Input from "../common/Input.vue";
import shortUUID from "short-uuid";

const router = useRouter();

const dialogOpened = ref(false);
const boardCode = ref("");
const importing = ref(false);

const uuidTranslator = shortUUID();

const importBoard = async () => {
  router.push({
    name: "board-import",
    params: { id: uuidTranslator.toUUID(boardCode.value) },
  });
};
</script>

<template>
  <div>
    <PageAction
      color="secondary"
      icon="mdi-import"
      label="Import new Board"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="importBoard">
      <template #title>
        Enter the code you received to import a new board
      </template>

      <template #form>
        <Input
          v-model="boardCode"
          label="Board code"
          :rules="[required, uuidTranslator.validate]"
        />
      </template>

      <template #actions>
        <QBtn
          :loading="importing"
          @click="dialogOpened = false"
          color="secondary"
        >
          Close
        </QBtn>
        <QBtn type="submit" :loading="importing" color="primary">Import</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
