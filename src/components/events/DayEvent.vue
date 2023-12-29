<script setup lang="ts">
import { Event } from "@/data/models/Event";
import { prettyFormatInterval } from "@/utils/dates";
import { computed } from "vue";

interface DayEventProps {
  event: Event;
  active?: boolean;
}

const props = defineProps<DayEventProps>();
const emit = defineEmits(["select"]);

const dateStr = computed(() =>
  prettyFormatInterval(props.event.start, props.event.end)
);

const onShow = () => emit("select");
</script>

<template>
  <div class="day-event">
    <QCard
      flat
      @click="onShow"
      class="event-card"
      :class="{ active: props.active }"
    >
      <QCardSection class="row">
        <div class="col-6">
          <div>{{ props.event.title }}</div>
          <div>{{ dateStr }}</div>
        </div>
        <QSpace />
        <QChip class="col-4"></QChip>
      </QCardSection>

      <QSlideTransition>
        <div v-show="props.active">
          <div class="event-card-content">
            {{ props.event.description }}
            <!-- frequency -->
          </div>
        </div>
      </QSlideTransition>
    </QCard>
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
}

.day-event .event-card.active {
  border: 2px solid rgba(0, 0, 0, 0.75);
}

.day-event .event-card-content {
  padding: 4px 16px;
}
</style>
