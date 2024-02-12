<script setup lang="ts">
import { EventAndTag } from "@/data/models/Event";
import DayEvent from "@/components/events/DayEvent.vue";
import DayEventHeader from "@/components/events/DayEventHeader.vue";
import { computed } from "vue";
import _ from "lodash";
import { hasRepetitionAtDay, nextRepetition } from "@/utils/dates";

interface DaysEventsProps {
  events: EventAndTag[];
  selected: EventAndTag | null;
  date: Date;
}

const props = defineProps<DaysEventsProps>();
const emit = defineEmits(["select"]);

const events = computed(() =>
  _(props.events)
    .chain()
    .filter((ev) => hasRepetitionAtDay(ev, props.date))
    .map((ev) => nextRepetition(ev, props.date))
    .filter((ev) => !!ev)
    .map((ev) => ev as EventAndTag)
    .sortBy((e) => e.start)
    .value()
);

const onSelect = (event: EventAndTag) => emit("select", event);
</script>

<template>
  <QList>
    <DayEventHeader :event-count="events.length" />
    <DayEvent
      v-for="(event, i) in events"
      :key="event.id"
      :event="event"
      :active="!!props.selected && props.selected.id == event.id"
      @select="() => onSelect(event)"
      :index="i"
    />
  </QList>
</template>
