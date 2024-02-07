<script setup lang="ts">
import format from "date-fns/format";
import parse from "date-fns/parse";
import { computed } from "vue";

interface EventCalendarProps {
  date: Date;
}

const props = defineProps<EventCalendarProps>();
const emit = defineEmits(["update:date"]);
const dateFormat = "yyyy/MM/dd";

const dateValue = computed(() => format(props.date, dateFormat));

const onUpdateDate = (v: any, _: any, __: any) => {
  console.log(v);
  typeof v == "string" && emit("update:date", parse(v, dateFormat, new Date()));
};
</script>

<template>
  <QDate
    :model-value="dateValue"
    @update:model-value="onUpdateDate"
    minimal
    first-day-of-week="1"
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
