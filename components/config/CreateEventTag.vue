<template>
  <div>
    <TagVue class="w-full" @click="openModal" :icon="faPlus" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new tag</template>
      <template #default>
        <div class="form-control gap-y-2">
          <TextInput
            label="Tag name"
            :value="title"
            placeholder="Enter name..."
            input-class="border-primary"
            @input="setTitle"
          />
          <TagColorInput
            :disabled-colors="props.disabledColors"
            :value="color"
            @input="setColor"
          />
          <IconInput :icon="icon" @input="setIcon" />
        </div>
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
import _ from "lodash";
import TagColorInput from "./TagColorInput.vue";
import IconInput from "../IconInput.vue";
import TagVue from "../Tag.vue";
import { useEventStore } from "~/stores/eventStore";

interface CreateEventTagProps {
  disabledColors: TagColor[];
}

const props = defineProps<CreateEventTagProps>();
const store = useEventStore();

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
  reset();
};

const reset = () => {
  setTitle("");
  setColor(TagColor.red);
  setIcon([faTag.prefix, faTag.iconName]);
};
</script>
