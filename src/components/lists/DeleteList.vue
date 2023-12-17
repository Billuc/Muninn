<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { ListService } from "@/data/services/listService";
import { List } from "@/data/models/List";
import { useRouter } from "vue-router";

interface EditListProps {
  list: List;
}

const props = defineProps<EditListProps>();

const dialogOpened = ref(false);
const listService = useService(ListService);
const router = useRouter();

const removing = ref(false);

const deleteList = async () => {
  removing.value = true;
  await listService.remove(props.list.id);

  setTimeout(() => {
    removing.value = false;
    dialogOpened.value = false;
    router.push({ name: "lists" });
  }, 100);
};
</script>

<template>
  <div>
    <PageAction
      color="primary"
      icon="mdi-delete"
      label="Delete List"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="deleteList">
      <template #title>
        Are you sure you want to delete list {{ props.list.title }}
      </template>

      <template #actions>
        <QBtn :loading="removing" @click="dialogOpened = false">No</QBtn>
        <QBtn type="submit" :loading="removing">Yes</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
