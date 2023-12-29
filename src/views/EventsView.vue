<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import CreateEvent from "@/components/events/CreateEvent.vue";
import EditEvent from "@/components/events/EditEvent.vue";
import DeleteEvent from "@/components/events/DeleteEvent.vue";
import ManageEventTags from "@/components/events/ManageEventTags.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ref, watchEffect } from "vue";
import { EventService } from "@/data/services/eventService";
import { hasRepetitionAtDay } from "@/utils/dates";
import { Event } from "@/data/models/Event";
import DaysEvents from "@/components/events/DaysEvents.vue";
import DateSelect from "@/components/common/DateSelect.vue";

const eventService = useService(EventService);

const date = ref(new Date());
const selected = ref<Event | null>(null);

const data = await eventService.getAllForDay(date.value);
const events = ref(data);
useSubscription(eventService, events, filter);

function filter(e: Event): boolean {
  return hasRepetitionAtDay(e, date.value);
}

const onSelect = (event: Event) =>
  (selected.value = event != selected.value ? event : null);

watchEffect(async () => {
  events.value = await eventService.getAllForDay(date.value);
});
</script>

<template>
  <div>
    <Title>
      <template #text>Events</template>
    </Title>

    <PageActions>
      <CreateEvent />
      <ManageEventTags />

      <template v-if="!!selected">
        <EditEvent :event="selected" />
        <DeleteEvent :event="selected" @delete="selected = null" />
      </template>
    </PageActions>

    <PageActions class="q-mt-sm">
      <DateSelect v-model="date" />
    </PageActions>

    <DaysEvents
      :events="events"
      :selected="selected"
      class="q-mt-md"
      @select="onSelect"
    />
  </div>
</template>
