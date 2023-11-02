<template>
  <Action
    :icon="faBroom"
    icon-class="text-error"
    label="Clear checked"
    @click="openModal"
  >
    <template #dialog>
      <Dialog :is-opened="isOpened" @close="closeModal">
        <template #title>
          Are you sure you want to remove checked elements ?
        </template>
        <template #actions>
          <Button class="btn-error" @click="closeModal" :loading="loading">
            No
          </Button>
          <Button class="btn-success ml-2" @click="execute" :loading="loading">
            Yes
          </Button>
        </template>
      </Dialog>
    </template>
  </Action>
</template>

<script setup lang="ts">
import { type List } from "~/data/models/List";
import { faBroom } from "@fortawesome/free-solid-svg-icons";
import { ListElementService } from "~/data/services/listElementService";

interface ClearCheckedButtonProps {
  list: List;
}

const props = defineProps<ClearCheckedButtonProps>();
const listElementService = useService(ListElementService);
const isOpened = ref(false);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const { loading, execute } = useAsyncAction(async () => {
  const listElements = await listElementService.getAllFromList(props.list.id);
  await Promise.all(
    listElements
      .filter((el) => el.done)
      .map(async (el) => await listElementService.remove(el.id))
  );
  closeModal();
});
</script>
