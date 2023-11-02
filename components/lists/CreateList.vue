<template>
  <div>
    <FABButton :icon="faPlus" @click="openModal" class="-bottom-4 right-4" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new list</template>
      <template #default>
        <ListsListForm v-model:name="name" ref="form" />
      </template>
      <template #actions>
        <Button class="btn-success" :loading="loading" @click="execute">
          Create
        </Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import type { ListsListForm } from "#build/components";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ListService } from "~/data/services/listService";

const service = useService(ListService);
const form = ref<InstanceType<typeof ListsListForm> | null>(null);

const isOpened = ref(false);
const name = ref("");

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const { loading, execute } = useAsyncAction(async () => {
  if (!form.value?.validate()) return;

  await service.create({
    title: name.value,
  });
  closeModal();
  reset();
});
const reset = () => (name.value = "");
</script>
