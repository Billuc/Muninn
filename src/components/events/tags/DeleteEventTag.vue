<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { EventTagService } from "@/data/services/eventTagService";
import { Tag } from "@/data/models/Tag";

interface DeleteEventTagProps {
  tag: Tag;
}

const props = defineProps<DeleteEventTagProps>();
const emit = defineEmits(["delete"]);

const dialogOpened = ref(false);
const eventTagService = useService(EventTagService);

const removing = ref(false);

const deleteEvent = async () => {
  removing.value = true;
  await eventTagService.remove(props.tag.id);

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
      label="Delete event tag"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="deleteEvent">
      <template #title>
        Are you sure you want to delete event tag {{ props.tag.title }}
      </template>

      <template #actions>
        <QBtn :loading="removing" @click="dialogOpened = false">No</QBtn>
        <QBtn type="submit" :loading="removing">Yes</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
