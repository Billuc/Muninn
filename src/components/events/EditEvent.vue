<script setup lang="ts">
import EventForm from "@/components/events/EventForm.vue";
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref, watchEffect } from "vue";
import { useService } from "@/composables/useService";
import { EventService } from "@/data/services/eventService";
import { Frequency } from "@/data/models/Event";
import addHours from "date-fns/addHours";
import { Event } from "@/data/models/Event";
import { ID } from "@/data/models/ID";

interface EditEventProps {
  event: Event | null;
}

const props = defineProps<EditEventProps>();

const dialogOpened = ref(false);
const eventService = useService(EventService);

const name = ref("");
const description = ref("");
const start = ref(new Date());
const end = ref(addHours(new Date(), 1));
const tagId = ref<ID>("");
const frequency = ref(Frequency.Once);
const frequencyMultiplier = ref(1);
const updating = ref(false);

const editEvent = async () => {
  if (!props.event) return;

  updating.value = true;
  await eventService.update({
    id: props.event.id,
    title: name.value,
    description: description.value,
    start: start.value,
    end: end.value,
    tagId: tagId.value ?? "",
    frequency: frequency.value,
    frequencyMultiplier: frequencyMultiplier.value,
  });

  setTimeout(() => {
    updating.value = false;
    dialogOpened.value = false;
  }, 100);
};

watchEffect(() => {
  if (!props.event) return;

  name.value = props.event.title;
  description.value = props.event.description;
  start.value = props.event.start;
  end.value = props.event.end ?? addHours(props.event.start, 1);
  tagId.value = props.event.tagId;
  frequency.value = props.event.frequency;
  frequencyMultiplier.value = props.event.frequencyMultiplier;
});
</script>

<template>
  <div>
    <PageAction
      color="secondary"
      icon="mdi-pen"
      label="Edit event"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="editEvent">
      <template #title>Edit {{ props.event?.title }}</template>

      <template #form>
        <EventForm
          v-model:title="name"
          v-model:description="description"
          v-model:start="start"
          v-model:end="end"
          v-model:tag-id="tagId"
          v-model:frequency="frequency"
          v-model:frequency-multiplier="frequencyMultiplier"
        />
      </template>

      <template #actions>
        <QBtn type="reset" color="info">Clear</QBtn>
        <QBtn type="submit" color="positive" :loading="updating">Save</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
