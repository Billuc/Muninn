<script setup lang="ts">
import { EventAndTag, FrequencyMapper } from "@/data/models/Event";
import { prettyFormatInterval } from "@/utils/dates";
import { computed } from "vue";
import TagChip from "@/components/common/tags/TagChip.vue";

interface DayEventCardProps {
  event: EventAndTag;
  active?: boolean;
  index: number;
}

const props = defineProps<DayEventCardProps>();
const emit = defineEmits(["select"]);

const dateStr = computed(() =>
  prettyFormatInterval(props.event.start, props.event.end)
);
const freqStr = computed(() =>
  FrequencyMapper[props.event.frequency].replace(
    "X",
    props.event.frequencyMultiplier.toString()
  )
);

const onShow = () => emit("select");
</script>

<template>
  <QCard flat @click="onShow" class="event-card">
    <div class="row q-pa-sm justify-around items-center">
      <div class="text-h5">{{ props.event.title }}</div>
      <div class="event-date montserrat">{{ dateStr }}</div>
      <TagChip :tag="props.event.tag" no-text dense v-if="props.event.tag" />
    </div>

    <QSlideTransition>
      <div v-show="props.active">
        <div class="event-card-content montserrat">
          {{ props.event.description }}
        </div>
        <div class="event-card-content montserrat text-center">
          Frequency : {{ freqStr }}
        </div>
      </div>
    </QSlideTransition>
  </QCard>
</template>

<style>
.day-event .event-card {
  border-radius: 8px;
  border: 2px solid transparent;
  transition: border ease-in 300ms;
}

.day-event.active .event-card {
  border-color: rgba(0, 0, 0, 0.75);
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
