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
          ref="form"
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
import _ from "lodash";
import { useEventStore } from "~/stores/eventStore";
import FABButton from "../FABButton.vue";
import TagForm from "./TagForm.vue";

interface CreateEventTagProps {
  disabledColors: TagColor[];
}

const props = defineProps<CreateEventTagProps>();
const store = useEventStore();
const form = ref<InstanceType<typeof TagForm> | null>(null);

const isOpened = ref(false);
const title = ref("");
const color = ref(TagColor.red);
const icon = ref<string[]>([faTag.prefix, faTag.iconName]);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const newTag = () => {
  if (!form.value?.validate()) return;

  store.newTag(title.value, color.value, icon.value);
  closeModal();
  reset();
};
const reset = () => {
  title.value = "";
  color.value = TagColor.red;
  icon.value = [faTag.prefix, faTag.iconName];
};
</script>
