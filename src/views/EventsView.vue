<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import CreateEvent from "@/components/events/CreateEvent.vue";
import EditEvent from "@/components/events/EditEvent.vue";
import DeleteEvent from "@/components/events/DeleteEvent.vue";
import ManageEventTags from "@/components/events/ManageEventTags.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { computed, ref, watchEffect } from "vue";
import { EventService } from "@/data/services/eventService";
import { hasRepetitionAtDay, nextRepetition } from "@/utils/dates";
import { EventAndTag, Event } from "@/data/models/Event";
import DaysEvents from "@/components/events/DaysEvents.vue";
import DateSelect from "@/components/common/DateSelect.vue";
import EventTagSelect from "@/components/events/tags/EventTagSelect.vue";
import { EventTagService } from "@/data/services/eventTagService";
import { ID } from "@/data/models/ID";
import _ from "lodash";
import EventCalendar from "@/components/events/EventCalendar.vue";

const eventService = useService(EventService);
const eventTagService = useService(EventTagService);

const date = ref(new Date());
const tagId = ref<ID>("");
const selected = ref<EventAndTag | null>(null);

function filter(e: Event): boolean {
  return hasRepetitionAtDay(e, date.value);
}

const data = await eventService.getAllForDay(date.value);
const events = ref(data);
useSubscription(eventService, events, filter);

const tagsData = await eventTagService.getAll();
const eventTags = ref(tagsData);
useSubscription(eventTagService, eventTags);

const eventsAndTags = computed(
  () =>
    _(events.value)
      .chain()
      .filter((ev) => !tagId.value || ev.tagId == tagId.value)
      .map((ev) => nextRepetition(ev, date.value))
      .filter((ev) => !!ev)
      .map((ev) => ({
        ...ev,
        tag: eventTags.value.find((t) => t.id == ev!.tagId) ?? null,
      }))
      .value() as EventAndTag[]
);

const onSelect = (event: EventAndTag) =>
  (selected.value = event.id != selected.value?.id ? event : null);

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
      <EventTagSelect v-model="tagId" filter-select />
    </PageActions>

    <DaysEvents
      :events="eventsAndTags"
      :selected="selected"
      class="q-mt-md"
      @select="onSelect"
    />
    <EventCalendar v-model:date="date" />
  </div>
</template>
