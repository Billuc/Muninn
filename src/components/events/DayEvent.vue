<script setup lang="ts">
import { EventAndTag } from "@/data/models/Event";
import { prettyFormatInterval } from "@/utils/dates";
import { computed } from "vue";
import TagChip from "@/components/common/tags/TagChip.vue";

interface DayEventProps {
  event: EventAndTag;
  active?: boolean;
  index: number;
}

const props = defineProps<DayEventProps>();
const emit = defineEmits(["select"]);

const dateStr = computed(() =>
  prettyFormatInterval(props.event.start, props.event.end)
);

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
    <QCard flat @click="onShow" class="event-card">
      <QCardSection class="row">
        <div class="col-6">
          <div>{{ props.event.title }}</div>
          <div>{{ dateStr }}</div>
        </div>
        <QSpace />
        <TagChip :tag="props.event.tag" v-if="props.event.tag" />
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
  border: 2px solid transparent;
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

.day-event .event-card-content {
  padding: 4px 16px;
}
</style>
