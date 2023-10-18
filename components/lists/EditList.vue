<template>
  <div class="inline-block">
    <Button :icon="faPen" @click="openModal" class="text-info btn-ghost" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Edit list "{{ props.list.title }}"</template>
      <template #default>
        <ListForm v-model:name="name" ref="form" />
      </template>
      <template #actions>
        <Button class="btn-success" label="Save" @click="editList"></Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useListStore } from "~/stores/listStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import { List } from "~/models/List";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ListForm from "./ListForm.vue";

interface EditListProps {
  list: List;
}

const props = defineProps<EditListProps>();
const store = useListStore();
const form = ref<InstanceType<typeof ListForm> | null>(null);

const isOpened = ref(false);
const name = ref(props.list.title);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

function editList() {
  if (!form.value?.validate()) return;

  store.editList(props.list.id, name.value);
  closeModal();
}
</script>
