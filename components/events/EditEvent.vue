<template>
  <Dialog :is-opened="isOpened" @close="close">
    <template #title>Update event '{{ props.event?.title }}'</template>
    <template #default>
      <EventsEventForm
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
      <Button
        class="btn-error ml-2"
        @click="removeEvent"
        :loading="removing || updating"
      >
        Delete
      </Button>
      <Button
        class="btn-success ml-2"
        @click="editEvent"
        :loading="removing || updating"
      >
        Save
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import type { EventsEventForm } from "#build/components";
import _ from "lodash";
import { type Event, Frequency } from "~/data/models/Event";
import { EventService } from "~/data/services/eventService";

interface EditEventProps {
  event: Event | null;
}

const props = defineProps<EditEventProps>();
const emit = defineEmits(["close"]);
const service = useService(EventService);

const isOpened = computed(() => !!props.event);
const form = ref<InstanceType<typeof EventsEventForm> | null>(null);

const title = ref("");
const date = ref(new Date());
const time = ref<[number?, number?]>([undefined, undefined]);
const duration = ref<[number?, number?]>([1, 0]);
const frequency = ref<Frequency>(Frequency.Once);
const frequencyMultiplier = ref(1);
const tagId = ref("");
const description = ref("");

const close = () => emit("close");

const { loading: updating, execute: editEvent } = useAsyncAction(async () => {
  if (!props.event) return;
  if (!form.value?.validate()) return;

  const start = parseDateTime(formatDate(date.value), time.value);

  await service.update({
    id: props.event.id,
    title: title.value,
    frequency: frequency.value,
    frequencyMultiplier: frequencyMultiplier.value,
    start: start,
    end: addDuration(start, duration.value),
    tagId: tagId.value,
    description: description.value,
  });
  close();
});
const { loading: removing, execute: removeEvent } = useAsyncAction(async () => {
  if (!props.event) return;

  await service.remove(props.event.id);
  close();
});

watchEffect(() => {
  if (props.event) {
    title.value = props.event.title;
    date.value = props.event.start;
    time.value = [props.event.start.getHours(), props.event.start.getMinutes()];
    frequency.value = props.event.frequency;
    frequencyMultiplier.value = props.event.frequencyMultiplier;
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
    frequencyMultiplier.value = 1;
    tagId.value = "";
    description.value = "";
  }
});
</script>
