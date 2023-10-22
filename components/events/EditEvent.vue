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
        v-model:description="description"
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

interface EditEventProps {
  event: Event | null;
}

const props = defineProps<EditEventProps>();
const emit = defineEmits(["close"]);
const store = useEventStore();
const form = ref<InstanceType<typeof EventForm> | null>(null);

const isOpened = computed(() => !!props.event);
const title = ref("");
const date = ref(new Date());
const time = ref<[number?, number?]>([undefined, undefined]);
const duration = ref<[number?, number?]>([1, 0]);
const frequency = ref<Frequency>(Frequency.Once);
const tagId = ref("");
const description = ref("");

const close = () => emit("close");

const editEvent = () => {
  if (!props.event) return;
  if (!form.value?.validate()) return;

  const start = parseDateTime(formatDate(date.value), time.value);

  store.editEvent(props.event.id, {
    title: title.value,
    frequency: frequency.value,
    start: start,
    end: addDuration(start, duration.value),
    tagId: tagId.value,
    description: description.value,
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
    date.value = props.event.start;
    time.value = [props.event.start.getHours(), props.event.start.getMinutes()];
    frequency.value = props.event.frequency;
    tagId.value = props.event.tagId;
    description.value = props.event.description ?? "";

    if (props.event.end) {
      const eventDuration = getDuration(props.event.start, props.event.end);
      duration.value = [eventDuration.hours, eventDuration.minutes];
    } else {
      duration.value = [0, 0];
    }
  } else {
    title.value = "";
    date.value = new Date();
    time.value = [undefined, undefined];
    duration.value = [1, 0];
    frequency.value = Frequency.Once;
    tagId.value = "";
    description.value = "";
  }
});
</script>
