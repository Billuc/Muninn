<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import CreateEvent from "@/components/events/CreateEvent.vue";
import EditEvent from "@/components/events/EditEvent.vue";
import DeleteEvent from "@/components/events/DeleteEvent.vue";
import ManageEventTags from "@/components/events/ManageEventTags.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { computed, ref } from "vue";
import { EventService } from "@/data/services/eventService";
import { EventAndTag } from "@/data/models/Event";
import DaysEvents from "@/components/events/DaysEvents.vue";
import DateSelect from "@/components/common/DateSelect.vue";
import EventTagSelect from "@/components/events/tags/EventTagSelect.vue";
import { EventTagService } from "@/data/services/eventTagService";
import { ID } from "@/data/models/ID";
import _ from "lodash";
import EventToggleViewButton from "@/components/events/EventToggleViewButton.vue";
import DayEventCalendar from "@/components/events/DayEventCalendar.vue";

const eventService = useService(EventService);
const eventTagService = useService(EventTagService);

const calendarView = ref(false);
const date = ref(new Date());
const tagId = ref<ID>("");
const selected = ref<EventAndTag | null>(null);

const data = await eventService.getAllForDay(date.value);
const events = ref(data);
useSubscription(eventService, events);

const tagsData = await eventTagService.getAll();
const eventTags = ref(tagsData);
useSubscription(eventTagService, eventTags);

const eventsAndTags = computed(
  () =>
    _(events.value)
      .chain()
      .filter((ev) => !tagId.value || ev.tagId == tagId.value)
      .filter((ev) => !!ev)
      .map((ev) => ({
        ...ev,
        tag: eventTags.value.find((t) => t.id == ev!.tagId) ?? null,
      }))
      .value() as EventAndTag[]
);

const onSelect = (event: EventAndTag) =>
  (selected.value = event.id != selected.value?.id ? event : null);
</script>

<template>
  <div>
    <Title>
      <template #text>Events</template>
      <template #suffix>
        <EventToggleViewButton
          v-model:is-calendar="calendarView"
          class="q-mr-sm"
        />
      </template>
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
      <DateSelect v-model="date" v-if="!calendarView" />
      <EventTagSelect v-model="tagId" filter-select />
    </PageActions>

    <div class="q-mt-md">
      <DaysEvents
        :date="date"
        :events="eventsAndTags"
        :selected="selected"
        @select="onSelect"
        v-if="!calendarView"
      />
      <DayEventCalendar
        v-model:date="date"
        :events="eventsAndTags"
        :selected="selected"
        @select="onSelect"
        v-else
      />
    </div>
  </div>
</template>
