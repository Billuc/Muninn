<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { ListService } from "@/data/services/listService";
import { List } from "@/data/models/List";
import { ListElementService } from "@/data/services/listElementService";
import CardActionBase from "../boards/CardActionBase.vue";

interface DeleteListProps {
  list: List;
}

const props = defineProps<DeleteListProps>();

const dialogOpened = ref(false);
const listService = useService(ListService);
const listElementService = useService(ListElementService);

const removing = ref(false);

const deleteList = async () => {
  removing.value = true;
  await listService.remove(props.list.id);
  await listElementService.removeAllChildren(props.list.id);

  setTimeout(() => {
    removing.value = false;
    dialogOpened.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <CardActionBase
      color="secondary"
      icon="mdi-delete"
      tooltip="Delete List"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="deleteList">
      <template #title>
        Are you sure you want to delete list {{ props.list.title }}
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
