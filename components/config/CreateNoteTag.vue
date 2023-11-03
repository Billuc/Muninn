<template>
  <div>
    <FABButton @click="openModal" :icon="faPlus" class="-bottom-4 right-4" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new tag</template>
      <template #default>
        <ConfigTagForm
          v-model:title="title"
          v-model:color="color"
          v-model:icon="icon"
          :disabled-colors="props.disabledColors"
          ref="form"
        />
      </template>
      <template #actions>
        <Button class="btn-success" @click="execute" :loading="loading">
          Create
        </Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { faPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import { TagColor } from "~/data/models/Tag";
import { NoteTagService } from "~/data/services/noteTagService";
import type { ConfigTagForm } from "#build/components";

interface CreateNoteTagProps {
  disabledColors: TagColor[];
}

const props = defineProps<CreateNoteTagProps>();
const service = useService(NoteTagService);
const form = ref<InstanceType<typeof ConfigTagForm> | null>(null);

const isOpened = ref(false);
const title = ref("");
const color = ref(TagColor.red);
const icon = ref<string[]>([faTag.prefix, faTag.iconName]);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const { loading, execute } = useAsyncAction(async () => {
  if (!form.value?.validate()) return;

  await service.create({
    color: color.value,
    icon: icon.value,
    title: title.value,
  });
  closeModal();
  reset();
});
const reset = () => {
  title.value = "";
  color.value = TagColor.red;
  icon.value = [faTag.prefix, faTag.iconName];
};
</script>
