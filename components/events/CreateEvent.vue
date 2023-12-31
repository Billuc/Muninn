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
          v-model:duration="duration"
          v-model:frequency="frequency"
          v-model:frequency-multiplier="frequencyMultiplier"
          v-model:tag-id="tagId"
          v-model:description="description"
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

interface CreateEventProps {
  date?: Date;
}

const props = defineProps<CreateEventProps>();
const store = useEventStore();
const { date: propsDate } = toRefs(props);
const isOpened = ref(false);
const form = ref<InstanceType<typeof EventForm> | null>(null);

const title = ref("");
const date = ref(propsDate?.value ?? new Date());
const time = ref<[number?, number?]>([new Date().getHours() + 1, 0]);
const duration = ref<[number?, number?]>([1, 0]);
const frequency = ref<Frequency>(Frequency.Once);
const frequencyMultiplier = ref(1);
const tagId = ref("");
const description = ref("");

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const newEvent = () => {
  if (!form.value?.validate()) return;

  const start = parseDateTime(formatDate(date.value), time.value);

  store.newEvent({
    title: title.value,
    frequency: frequency.value,
    frequencyMultiplier: frequencyMultiplier.value,
    start: start,
    end: addDuration(start, duration.value),
    tagId: tagId.value,
    description: description.value,
  });
  closeModal();
  reset();
};
const reset = () => {
  title.value = "";
  date.value = new Date();
  time.value = [undefined, undefined];
  duration.value = [1, 0];
  frequency.value = Frequency.Once;
  frequencyMultiplier.value = 1;
  tagId.value = "";
  description.value = "";
};

watch([propsDate], () => {
  date.value = propsDate?.value ?? new Date();
});
</script>
