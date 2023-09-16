<template>
  <div>
    <Button @click="openModal">Manage tags</Button>

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title> Manage note tags </template>
      <template #default>
        <TagList
          :tags="tagsArray"
          editable
          removable
          @remove="removeTag"
          @edit="editTag"
        ></TagList>
      </template>
    </Dialog>

    <EditNoteTag :tag="tagToEdit" @close="tagToEdit = null" />
  </div>
</template>

<script setup lang="ts">
import { useNoteStore } from "~/stores/noteStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import TagList from "../TagList.vue";
import { Tag } from "~/models/Tag";
import EditNoteTag from "./EditNoteTag.vue";

const store = useNoteStore();
const isOpened = ref(false);
const tagToEdit = ref<Tag | null>(null);

const tagsArray = computed(() => [...store.tags.values()]);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const removeTag = (tag: Tag) => store.removeTag(tag.id);
const editTag = (tag: Tag) => (tagToEdit.value = tag);
</script>
