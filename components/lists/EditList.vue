<template>
  <Action
    :icon="faPen"
    icon-class="text-info"
    label="Edit list"
    @click="openModal"
  >
    <template #dialog>
      <Dialog :is-opened="isOpened" @close="closeModal">
        <template #title>Edit list "{{ props.list.title }}"</template>
        <template #default>
          <ListsListForm v-model:name="name" ref="form" />
        </template>
        <template #actions>
          <Button
            class="btn-success"
            label="Save"
            @click="execute"
            :loading="loading"
          />
        </template>
      </Dialog>
    </template>
  </Action>
</template>

<script setup lang="ts">
import { type List } from "~/data/models/List";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { ListService } from "~/data/services/listService";
import type { ListsListForm } from "#build/components";

interface EditListProps {
  list: List;
}

const props = defineProps<EditListProps>();
const listService = useService(ListService);

const form = ref<InstanceType<typeof ListsListForm> | null>(null);
const isOpened = ref(false);
const name = ref(props.list.title);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const { loading, execute } = useAsyncAction(async () => {
  if (!form.value?.validate()) return;

  await listService.update({
    id: props.list.id,
    hideChecked: props.list.hideChecked,
    title: name.value,
  });
  closeModal();
});
</script>
