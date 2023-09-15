<template>
  <div>
    <FABButton
      :icon="faPlus"
      class="absolute -bottom-4 right-4 shadow-md"
      @click="openModal"
    />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Create a new event</template>
      <template #default>
        <div class="form-control gap-y-2">
          <TextInput
            label="Event name"
            placeholder="Enter name..."
            :value="title"
            @input="setTitle"
          />

          <DateTimeSelector
            :value="startDate"
            @input="setStartDate"
            label="Start of event"
          />
        </div>
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
import TextInput from "../TextInput.vue";
import DateTimeSelector from "../DateTimeSelector.vue";

const store = useEventStore();
const isOpened = ref(false);

const title = ref("");
const startDate = ref(new Date());

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);
const setTitle = (v: string) => (title.value = v);
const setStartDate = (v: Date) => (startDate.value = v);

const newEvent = () => {
  store.newEvent({
    title: title.value,
    description: "",
    frequency: Frequency.Once,
    start: startDate.value,
    end: undefined,
  });
  closeModal();
};
</script>
