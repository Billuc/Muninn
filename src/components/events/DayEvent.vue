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
  <div class="day-event">
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
</style>
