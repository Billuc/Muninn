<script setup lang="ts">
import ListForm from "@/components/lists/ListForm.vue";
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { ListService } from "@/data/services/listService";
import { List } from "@/data/models/List";

interface EditListProps {
  list: List;
}

const props = defineProps<EditListProps>();

const dialogOpened = ref(false);
const listService = useService(ListService);

const name = ref(props.list.title);
const updating = ref(false);

const editList = async () => {
  updating.value = true;
  await listService.update({ ...props.list, title: name.value });

  setTimeout(() => {
    updating.value = false;
    dialogOpened.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <PageAction
      color="primary"
      icon="mdi-pen"
      label="Edit List"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="editList">
      <template #title>Edit {{ props.list.title }}</template>

      <template #form>
        <ListForm v-model:title="name" />
      </template>

      <template #actions>
        <QBtn type="reset" color="info">Clear</QBtn>
        <QBtn type="submit" color="positive" :loading="updating">Save</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
