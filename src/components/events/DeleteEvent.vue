<script setup lang="ts">
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { EventService } from "@/data/services/eventService";
import { Event } from "@/data/models/Event";

interface DeleteEventProps {
  event: Event;
}

const props = defineProps<DeleteEventProps>();
const emit = defineEmits(["delete"]);

const dialogOpened = ref(false);
const eventService = useService(EventService);

const removing = ref(false);

const deleteEvent = async () => {
  removing.value = true;
  await eventService.remove(props.event.id);

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
      label="Delete event"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="deleteEvent">
      <template #title>
        Are you sure you want to delete event {{ props.event.title }}
      </template>

      <template #actions>
        <QBtn :loading="removing" @click="dialogOpened = false">No</QBtn>
        <QBtn type="submit" :loading="removing">Yes</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
