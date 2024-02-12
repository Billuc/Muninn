<script setup lang="ts">
import { EventAndTag } from "@/data/models/Event";
import DayEventCard from "@/components/events/DayEventCard.vue";

interface DayEventProps {
  event: EventAndTag;
  active?: boolean;
  index: number;
}

const props = defineProps<DayEventProps>();
const emit = defineEmits(["select"]);

const onShow = () => emit("select");
</script>

<template>
  <div
    class="day-event"
    :class="{
      even: props.index % 2 == 0,
      odd: props.index % 2 == 1,
      active: props.active,
    }"
  >
    <DayEventCard
      :active="props.active"
      :event="props.event"
      :index="props.index"
      @select="onShow"
    />
  </div>
</template>

<style>
.day-event {
  position: relative;
  padding-bottom: 1rem;
}

.day-event::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-1px);
  width: 2px;
  height: 1rem;
  background-color: var(--q-primary);
}

.day-event .event-card {
  border-radius: 8px;
  border: 2px solid transparent;
  transition: border ease-in 300ms;
}

.day-event.active .event-card {
  border-color: rgba(0, 0, 0, 0.75);
}

.day-event.even .event-card {
  background: #ffffff;
}

.day-event.odd .event-card {
  background: #dddddd;
}

.event-card > .row {
  padding: 0 4px;
}

.day-event.active .event-card-content {
  margin: 4px 16px;
  border-top: 1px solid var(--q-list-neutral);
  font-style: italic;
  font-size: 0.8rem;
}

.day-event .event-date {
  font-size: 0.75rem;
  font-weight: 300;
}
</style>
