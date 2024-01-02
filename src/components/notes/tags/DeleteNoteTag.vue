<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { NoteTagService } from "@/data/services/noteTagService";
import { Tag } from "@/data/models/Tag";

interface DeleteNoteTagProps {
  tag: Tag;
}

const props = defineProps<DeleteNoteTagProps>();
const emit = defineEmits(["delete"]);

const dialogOpened = ref(false);
const noteTagService = useService(NoteTagService);

const removing = ref(false);

const deleteNoteTag = async () => {
  removing.value = true;
  await noteTagService.remove(props.tag.id);

  setTimeout(() => {
    removing.value = false;
    dialogOpened.value = false;
  }, 100);

  emit("delete");
};
</script>

<template>
  <div>
    <PageAction
      color="primary"
      icon="mdi-delete"
      label="Delete note tag"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="deleteNoteTag">
      <template #title>
        Are you sure you want to delete note tag {{ props.tag.title }}
      </template>

      <template #actions>
        <QBtn :loading="removing" @click="dialogOpened = false">No</QBtn>
        <QBtn type="submit" :loading="removing">Yes</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
