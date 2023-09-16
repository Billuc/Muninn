<template>
  <Dialog :is-opened="isOpened" @close="close">
    <template #title>Update event '{{ props.event?.title }}'</template>
    <template #default>
      <div class="form-control my-4 gap-y-2">
        <TextInput
          label="Event name"
          placeholder="Enter name..."
          :value="title"
          @input="setTitle"
        />

        <div class="flex flex-nowrap gap-2">
          <DateTimeSelector
            :value="startDate"
            @input="setStartDate"
            label="Start of event"
          />
          <DateTimeSelector
            :value="endDate"
            @input="setEndDate"
            label="End of event"
            clearable
          />
        </div>

        <MultilineInput
          label="Description (optional)"
          placeholder="Enter description... (optional)"
          :value="description"
          @input="setDescription"
          clearable
        />
      </div>
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
import TextInput from "../TextInput.vue";
import DateTimeSelector from "../DateTimeSelector.vue";
import MultilineInput from "../MultilineInput.vue";

interface EditEventProps {
  event: Event | null;
}

const props = defineProps<EditEventProps>();
const emit = defineEmits(["close"]);
const store = useEventStore();

const isOpened = computed(() => !!props.event);
const title = ref("");
const startDate = ref(new Date());
const endDate = ref<Date | null>(null);
const description = ref("");

const setTitle = (v: string) => (title.value = v);
const setStartDate = (v: Date) => (startDate.value = v);
const setEndDate = (v: Date | null) => (endDate.value = v);
const setDescription = (v: string | null) => (description.value = v ?? "");
const close = () => emit("close");

const editEvent = () => {
  if (!props.event) return;

  store.editEvent(props.event.id, {
    title: title.value,
    description: "",
    frequency: Frequency.Once,
    start: startDate.value,
    end: undefined,
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
    startDate.value = props.event.start;
    endDate.value = props.event.end ?? null;
    description.value = props.event.description;
  } else {
    title.value = "";
    startDate.value = new Date();
    endDate.value = new Date();
    description.value = "";
  }
});
</script>
