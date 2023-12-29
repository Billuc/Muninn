<script setup lang="ts">
import { Event } from "@/data/models/Event";
import DayEvent from "@/components/events/DayEvent.vue";
import DayEventHeader from "@/components/events/DayEventHeader.vue";
import { computed } from "vue";
import { sortBy } from "lodash";

interface DaysEventsProps {
  events: Event[];
  selected: Event | null;
}

const props = defineProps<DaysEventsProps>();
const emit = defineEmits(["select"]);

const events = computed(() => sortBy(props.events, (e) => e.start));

const onSelect = (event: Event) => emit("select", event);
</script>

<template>
  <QList>
    <DayEventHeader :event-count="events.length" />
    <DayEvent
      v-for="event in events"
      :key="event.id"
      :event="event"
      :active="!!props.selected && props.selected.id == event.id"
      @select="() => onSelect(event)"
    />
  </QList>
</template>
