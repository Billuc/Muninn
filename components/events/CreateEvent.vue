<template>
  <div>
    <FABButton :icon="faPlus" class="-bottom-4 right-4" @click="openModal" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new event</template>
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
        <Button class="btn-success" @click="execute" :loading="loading">
          Create
        </Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import type { EventsEventForm } from "#build/components";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Frequency } from "~/data/models/Event";
import { EventService } from "~/data/services/eventService";

interface CreateEventProps {
  date?: Date;
}

const props = defineProps<CreateEventProps>();
const service = useService(EventService);

const isOpened = ref(false);
const form = ref<InstanceType<typeof EventsEventForm> | null>(null);

const title = ref("");
const date = ref(props.date ?? new Date());
const time = ref<[number?, number?]>([new Date().getHours() + 1, 0]);
const duration = ref<[number?, number?]>([1, 0]);
const frequency = ref<Frequency>(Frequency.Once);
const frequencyMultiplier = ref(1);
const tagId = ref("");
const description = ref("");

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const { loading, execute } = useAsyncAction(async () => {
  if (!form.value?.validate()) return;

  const start = parseDateTime(formatDate(date.value), time.value);
  await service.create({
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
});
const reset = () => {
  title.value = "";
  date.value = props.date ?? new Date();
  time.value = [undefined, undefined];
  duration.value = [1, 0];
  frequency.value = Frequency.Once;
  frequencyMultiplier.value = 1;
  tagId.value = "";
  description.value = "";
};

watchEffect(() => (date.value = props.date ?? new Date()));
</script>
