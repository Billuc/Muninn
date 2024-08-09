<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { BoardTagService } from "@/data/services/boardTagService";
import { Tag } from "@/data/models/Tag";

interface DeleteBoardTagProps {
  tag: Tag;
}

const boardTagService = useService(BoardTagService);

const props = defineProps<DeleteBoardTagProps>();
const emit = defineEmits(["delete"]);

const dialogOpened = ref(false);
const removing = ref(false);

const deleteTag = async () => {
  removing.value = true;
  await boardTagService.remove(props.tag.id);

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
      color="secondary"
      icon="mdi-delete"
      label="Delete board tag"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="deleteTag">
      <template #title>
        Are you sure you want to delete board tag {{ props.tag.title }}
      </template>

      <template #actions>
        <QBtn :loading="removing" @click="dialogOpened = false">No</QBtn>
        <QBtn type="submit" :loading="removing">Yes</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
