<template>
  <Action
    :icon="faTrash"
    icon-class="text-error"
    label="Delete list"
    @click="openModal"
  >
    <template #dialog>
      <Dialog :is-opened="isOpened" @close="closeModal">
        <template #title>
          Are you sure you want to remove list "{{ props.list.title }}" ?
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
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { type List } from "~/data/models/List";
import { ListService } from "~/data/services/listService";

interface DeleteListProps {
  list: List;
}

const props = defineProps<DeleteListProps>();
const router = useRouter();
const listService = useService(ListService);

const isOpened = ref(false);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const { loading, execute } = useAsyncAction(async () => {
  await listService.remove(props.list.id);
  await router.push({ name: "lists " });
  closeModal();
});
</script>
