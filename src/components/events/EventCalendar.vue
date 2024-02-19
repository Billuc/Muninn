<script setup lang="ts">
import { EventAndTag } from "@/data/models/Event";
import { hasRepetitionAtDay } from "@/utils/dates";
import format from "date-fns/format";
import parse from "date-fns/parse";
import { computed } from "vue";

interface EventCalendarProps {
  date: Date;
  events: EventAndTag[];
}

const props = defineProps<EventCalendarProps>();
const emit = defineEmits(["update:date", "select"]);
const dateFormat = "yyyy/MM/dd";

const dateValue = computed(() => format(props.date, dateFormat));

const eventFn = (dateStr: string) => {
  const date = parse(dateStr, dateFormat, new Date());
  return props.events.some((ev) => hasRepetitionAtDay(ev, date));
};
const eventColorFn = (dateStr: string) => {
  const date = parse(dateStr, dateFormat, new Date());
  const nbOfEvents = props.events.filter((ev) =>
    hasRepetitionAtDay(ev, date)
  ).length;

  switch (nbOfEvents) {
    case 1:
      return "cyan";
    case 2:
      return "green";
    case 3:
      return "orange";
    default:
      return "red";
  }
};
const onUpdateDate = (v: any, _: any, __: any) => {
  typeof v == "string" && emit("update:date", parse(v, dateFormat, new Date()));
};
</script>

<template>
  <QDate
    :model-value="dateValue"
    @update:model-value="onUpdateDate"
    minimal
    first-day-of-week="1"
    :events="eventFn"
    :event-color="eventColorFn"
    class="event-calendar"
  />
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
