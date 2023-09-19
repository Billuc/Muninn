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

          <div class="flex flex-nowrap gap-2 overflow-x-auto">
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

          <FrequencySelecter
            :frequency="frequency"
            @update:frequency="setFrequency"
          />

          <TagSelecter
            :tags="tags"
            :selected="tagId"
            @update:selected="setTagId"
          />

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
import FrequencySelecter from "./FrequencySelecter.vue";
import MultilineInput from "../MultilineInput.vue";
import TagSelecter from "../TagSelecter.vue";

const store = useEventStore();
const isOpened = ref(false);
const tags = store.tagArray;

const title = ref("");
const startDate = ref(new Date());
const endDate = ref<Date | null>(null);
const frequency = ref<Frequency>(Frequency.Once);
const description = ref("");
const tagId = ref(-1);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);

const setTitle = (v: string) => (title.value = v);
const setStartDate = (v: Date) => (startDate.value = v);
const setEndDate = (v: Date | null) => (endDate.value = v);
const setFrequency = (v: Frequency) => (frequency.value = v);
const setDescription = (v: string | null) => (description.value = v ?? "");
const setTagId = (v: number) => (tagId.value = v);

const newEvent = () => {
  store.newEvent({
    title: title.value,
    description: description.value,
    frequency: frequency.value,
    start: startDate.value,
    end: endDate.value ?? undefined,
    tagId: tagId.value,
  });
  closeModal();
};
</script>
