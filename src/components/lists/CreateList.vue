<script setup lang="ts">
import ListForm from "@/components/lists/ListForm.vue";
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { ListService } from "@/data/services/listService";

const dialogOpened = ref(false);
const listService = useService(ListService);

const name = ref("");
const creating = ref(false);

const createList = async () => {
  creating.value = true;
  await listService.create({ title: name.value });

  setTimeout(() => {
    creating.value = false;
    dialogOpened.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <PageAction
      color="primary"
      icon="mdi-plus"
      label="Add List"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="createList">
      <template #title>New List</template>

      <template #form>
        <ListForm v-model:title="name" />
      </template>

      <template #actions>
        <QBtn type="reset" color="info">Clear</QBtn>
        <QBtn type="submit" color="positive" :loading="creating">Create</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
