<template>
  <div>
    <FABButton @click="openModal" :icon="faPlus" class="-bottom-4 right-4" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new tag</template>
      <template #default>
        <TagForm
          v-model:title="title"
          v-model:color="color"
          v-model:icon="icon"
          :disabled-colors="props.disabledColors"
        />
      </template>
      <template #actions>
        <Button class="btn-success" @click="newTag">Create</Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { TagColor } from "~/models/Tag";
import Button from "../Button.vue";
import { faPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import { useNoteStore } from "~/stores/noteStore";
import _ from "lodash";
import TagForm from "./TagForm.vue";
import FABButton from "../FABButton.vue";

interface CreateNoteTagProps {
  disabledColors: TagColor[];
}

const props = defineProps<CreateNoteTagProps>();
const store = useNoteStore();

const isOpened = ref(false);
const title = ref("");
const color = ref(TagColor.red);
const icon = ref<string[]>([faTag.prefix, faTag.iconName]);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const setTitle = (newTitle: string) => (title.value = newTitle);
const setColor = (newColor: TagColor) => (color.value = newColor);
const setIcon = (newIcon: string[]) => (icon.value = newIcon);

const newTag = () => {
  store.newTag(title.value, color.value, icon.value);
  closeModal();
};
</script>
