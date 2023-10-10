<template>
  <Dialog :is-opened="isOpened" @close="close">
    <template #title>Update event '{{ props.event?.title }}'</template>
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
import { addHours, addMinutes } from "date-fns";
import { formatTime } from "~/utils/dates";

interface EditEventProps {
  event: Event | null;
}

const props = defineProps<EditEventProps>();
const emit = defineEmits(["close"]);
const store = useEventStore();
const form = ref<InstanceType<typeof EventForm> | null>(null);

const isOpened = computed(() => !!props.event);
const title = ref("");
const date = ref("");
const time = ref("");
const hours = ref(1);
const minutes = ref(0);
const frequency = ref<Frequency>(Frequency.Once);
const tagId = ref(-1);

const close = () => emit("close");

const editEvent = () => {
  if (!props.event) return;
  if (!form.value?.validate()) return;

  store.editEvent(props.event.id, {
    title: title.value,
    frequency: frequency.value,
    start: parseDateTime(date.value, time.value),
    end: addMinutes(
      addHours(parseDateTime(date.value, time.value), hours.value),
      minutes.value
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
    frequency.value = props.event.frequency;
    tagId.value = props.event.tagId;

    if (props.event.end) {
      const duration = getDuration(props.event.start, props.event.end);
      hours.value = duration.hours ?? 0;
      minutes.value = duration.minutes ?? 0;
    } else {
      hours.value = 0;
      minutes.value = 0;
    }
  } else {
    title.value = "";
    date.value = "";
    time.value = "";
    hours.value = 1;
    minutes.value = 0;
    frequency.value = Frequency.Once;
    tagId.value = -1;
  }
});
</script>
