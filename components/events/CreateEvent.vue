<template>
  <div>
    <FABButton :icon="faPlus" class="-bottom-4 right-4" @click="openModal" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new event</template>
      <template #default>
        <EventForm
          v-model:title="title"
          v-model:date="date"
          v-model:time="time"
          v-model:hours="hours"
          v-model:minutes="minutes"
          v-model:frequency="frequency"
          v-model:tag-id="tagId"
          ref="form"
        />
      </template>
      <template #actions>
        <Button class="btn-success" @click="newEvent">Create</Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FABButton from "../FABButton.vue";
import Dialog from "../Dialog.vue";
import { useEventStore } from "~/stores/eventStore";
import { Frequency } from "~/models/Event";
import EventForm from "./EventForm.vue";
import { addHours, addMinutes } from "date-fns";

const store = useEventStore();
const isOpened = ref(false);
const form = ref<InstanceType<typeof EventForm> | null>(null);

const title = ref("");
const date = ref("");
const time = ref("");
const hours = ref(1);
const minutes = ref(0);
const frequency = ref<Frequency>(Frequency.Once);
const tagId = ref(-1);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const newEvent = () => {
  if (!form.value?.validate()) return;

  store.newEvent({
    title: title.value,
    frequency: frequency.value,
    start: parseDateTime(date.value, time.value),
    end: addMinutes(
      addHours(parseDateTime(date.value, time.value), hours.value),
      minutes.value
    ),
    tagId: tagId.value,
  });
  closeModal();
  reset();
};
const reset = () => {
  title.value = "";
  date.value = "";
  time.value = "";
  hours.value = 1;
  minutes.value = 0;
  frequency.value = Frequency.Once;
  tagId.value = -1;
};
</script>
