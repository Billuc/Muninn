<script setup lang="ts">
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { EventService } from "@/data/services/eventService";
import { nextRepetition, hasRepetitionAtDay } from "@/utils/dates";
import { computed, ref } from "vue";
import Card from "../common/Card.vue";
import List from "../common/List.vue";
import { endOfDay, startOfDay, max, min, format } from "date-fns";
import _ from "lodash";
import { EventTagService } from "@/data/services/eventTagService";
import TagChip from "../common/tags/TagChip.vue";

const date = new Date();
const dateStart = startOfDay(date);
const dateEnd = endOfDay(date);

const eventService = useService(EventService);
const eventsData = await eventService.getAllForDay(date);
const events = ref(eventsData);
useSubscription(eventService, events, (ev) => hasRepetitionAtDay(ev, date));

const eventTagService = useService(EventTagService);
const tagsData = await eventTagService.getAll();
const eventTags = ref(tagsData);
useSubscription(eventTagService, eventTags);

const cardTitle = computed(() => `${events.value.length} events today`);
const sortedEvents = computed(() => {
  return _(events.value)
    .chain()
    .map((ev) => {
      const repetitionAtDay = nextRepetition(ev, date);
      if (!repetitionAtDay) return null;

      return {
        ...repetitionAtDay,
        start: max([repetitionAtDay.start, dateStart]),
        end: min([repetitionAtDay.end!, dateEnd]),
        tag: eventTags.value.find((t) => t.id == ev.tagId) ?? null,
      };
    })
    .filter((ev) => !!ev)
    .sortBy((ev) => ev!.start)
    .value();
});
</script>

<template>
  <Card :title="cardTitle">
    <List :elements="sortedEvents">
      <template #element="{ element }">
        <div class="col-2">
          <TagChip :tag="element.tag" v-if="element.tag" dense no-text />
        </div>
        <QSpace />
        <div class="col-6 text-uppercase">{{ element.title }}</div>
        <QSpace />
        <div class="col-4 text-center">
          {{ format(element.start, "HH:mm") }} -
          {{ format(element.end, "HH:mm") }}
        </div>
      </template>
    </List>
  </Card>
</template>
