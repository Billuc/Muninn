<script setup lang="ts">
import PageAction from "@/components/common/PageAction.vue";
import FormDialog from "@/components/common/FormDialog.vue";
import { useService } from "@/composables/useService";
import { List } from "@/data/models/List";
import { ListElementService } from "@/data/services/listElementService";
import { ref } from "vue";

interface ClearCheckedProps {
  list: List;
}

const props = defineProps<ClearCheckedProps>();
const listElementService = useService(ListElementService);

const dialogOpened = ref(false);
const clearing = ref(false);

const clearChecked = async () => {
  clearing.value = true;
  const children = await listElementService.getAllChildren(props.list.id);
  await Promise.all(
    children
      .filter((el) => el.done)
      .map((el) => listElementService.remove(el.id))
  );

  setTimeout(() => {
    clearing.value = false;
    dialogOpened.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <PageAction
      icon="mdi-broom"
      label="Clear checked"
      @click="dialogOpened = true"
      color="secondary"
    />

    <FormDialog v-model="dialogOpened" @submit="clearChecked">
      <template #title>
        Are you sure you want to delete all checked elements ?
      </template>

      <template #actions>
        <QBtn :loading="clearing" @click="dialogOpened = false">No</QBtn>
        <QBtn type="submit" :loading="clearing">Yes</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
