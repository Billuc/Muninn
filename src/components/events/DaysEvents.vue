<script setup lang="ts">
import { EventAndTag } from "@/data/models/Event";
import DayEvent from "@/components/events/DayEvent.vue";
import DayEventHeader from "@/components/events/DayEventHeader.vue";
import { computed } from "vue";
import { sortBy } from "lodash";

interface DaysEventsProps {
  events: EventAndTag[];
  selected: EventAndTag | null;
}

const props = defineProps<DaysEventsProps>();
const emit = defineEmits(["select"]);

const events = computed(() => sortBy(props.events, (e) => e.start));

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
