<script setup lang="ts">
import EventForm from "@/components/events/EventForm.vue";
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { EventService } from "@/data/services/eventService";
import { Frequency } from "@/data/models/Event";
import addHours from "date-fns/addHours";

const dialogOpened = ref(false);
const eventService = useService(EventService);

const name = ref("");
const description = ref("");
const start = ref(new Date());
const end = ref(addHours(new Date(), 1));
const tagId = ref("");
const frequency = ref(Frequency.Once);
const frequencyMultiplier = ref(1);
const creating = ref(false);

const createEvent = async () => {
  creating.value = true;
  await eventService.create({
    title: name.value,
    description: description.value,
    start: start.value,
    end: end.value,
    tagId: tagId.value,
    frequency: frequency.value,
    frequencyMultiplier: frequencyMultiplier.value,
  });

  setTimeout(() => {
    creating.value = false;
    dialogOpened.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <PageAction
      color="primary"
      icon="mdi-plus"
      label="Add event"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="createEvent">
      <template #title>New event</template>

      <template #form>
        <EventForm
          v-model:title="name"
          v-model:description="description"
          v-model:start="start"
          v-model:end="end"
          v-model:tag-id="tagId"
        />
      </template>

      <template #actions>
        <QBtn type="reset" color="info">Clear</QBtn>
        <QBtn type="submit" color="positive" :loading="creating">Create</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
