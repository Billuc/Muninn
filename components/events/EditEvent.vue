<template>
  <Dialog :is-opened="isOpened" @close="close">
    <template #title>Update event '{{ props.event?.title }}'</template>
    <template #default>
      <EventForm
        v-model:title="title"
        v-model:date="date"
        v-model:time="time"
        v-model:duration="duration"
        v-model:frequency="frequency"
        v-model:tag-id="tagId"
      />
    </template>
    <template #actions>
      <Button class="btn-error ml-2" @click="removeEvent">Delete</Button>
      <Button class="btn-success ml-2" @click="editEvent">Save</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from "../Dialog.vue";
import { useEventStore } from "~/stores/eventStore";
import { Event, Frequency } from "~/models/Event";
import _ from "lodash";
import EventForm from "./EventForm.vue";
import { addMinutes } from "date-fns";
import { formatTime } from "~/utils/dates";

interface EditEventProps {
  event: Event | null;
}

const props = defineProps<EditEventProps>();
const emit = defineEmits(["close"]);
const store = useEventStore();

const isOpened = computed(() => !!props.event);
const title = ref("");
const date = ref("");
const time = ref("");
const duration = ref("01:00");
const frequency = ref<Frequency>(Frequency.Once);
const tagId = ref(-1);

const close = () => emit("close");

const editEvent = () => {
  if (!props.event) return;

  store.editEvent(props.event.id, {
    title: title.value,
    frequency: frequency.value,
    start: parseDateTime(date.value, time.value),
    end: addMinutes(
      parseDateTime(date.value, time.value),
      parseTimeAsMinutes(duration.value)
    ),
    tagId: tagId.value,
  });
  close();
};
const removeEvent = () => {
  if (!props.event) return;

  store.removeEvent(props.event.id);
  close();
};

watchEffect(() => {
  if (props.event) {
    title.value = props.event.title;
    date.value = formatDate(props.event.start);
    time.value = formatTime(props.event.start);
    duration.value = !props.event.end
      ? "00:00"
      : formatDuration(props.event.start, props.event.end);
    frequency.value = props.event.frequency;
    tagId.value = props.event.tagId;
  } else {
    title.value = "";
    date.value = "";
    time.value = "";
    duration.value = "01:00";
    frequency.value = Frequency.Once;
    tagId.value = -1;
  }
});
</script>
