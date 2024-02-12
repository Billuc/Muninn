<script setup lang="ts">
import { EventAndTag } from "@/data/models/Event";
import { hasRepetitionAtDay } from "@/utils/dates";
import { computed } from "vue";
import DayEventCard from "./DayEventCard.vue";
import EventCalendar from "./EventCalendar.vue";

interface DayEventCalendarProps {
  date: Date;
  events: EventAndTag[];
  selected: EventAndTag | null;
}

const props = defineProps<DayEventCalendarProps>();
const emit = defineEmits(["update:date", "select"]);

const daysEvents = computed(() =>
  props.events.filter((ev) => hasRepetitionAtDay(ev, props.date))
);

const onUpdateDate = (v: Date) => emit("update:date", v);
const onSelect = (v: EventAndTag) => emit("select", v);
</script>

<template>
  <div>
    <EventCalendar
      :date="props.date"
      :events="props.events"
      @update:date="onUpdateDate"
    />

    <div class="q-mt-md">
      <DayEventCard
        v-for="(ev, i) in daysEvents"
        :event="ev"
        :index="i"
        :active="!!props.selected && props.selected.id == ev.id"
        @select="() => onSelect(ev)"
      />
    </div>
  </div>
</template>

<style>
.event-calendar {
  width: 100%;
  background: var(--q-background);
  border-radius: 1rem;
}

.event-calendar .q-date__navigation {
  background: var(--q-primary);
  color: var(--q-background);
  opacity: 0.9;
  border-radius: 9999px;
}
</style>
