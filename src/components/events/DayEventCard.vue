<script setup lang="ts">
import { EventAndTag, FrequencyMapper } from "@/data/models/Event";
import { prettyFormatInterval } from "@/utils/dates";
import { computed } from "vue";
import TagChip from "@/components/common/tags/TagChip.vue";
import ListElement from "../common/ListElement.vue";

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
  <ListElement
    :index="props.index"
    :selected="props.active"
    @click="onShow"
    class="event-card"
  >
    <div class="col-6 text-left ellipsis">
      {{ props.event.title }}
    </div>
    <div class="col-4 text-center montserrat text-caption text-center">
      {{ dateStr }}
    </div>
    <div class="col-2 text-right">
      <TagChip :tag="props.event.tag" v-if="props.event.tag" dense no-text />
    </div>

    <QSlideTransition class="col-12">
      <div v-show="props.active">
        <div class="event-card-content montserrat">
          {{ props.event.description }}
        </div>
        <div class="event-card-content montserrat text-center">
          Frequency : {{ freqStr }}
        </div>
      </div>
    </QSlideTransition>
  </ListElement>
</template>

<style>
.event-card.selected .event-card-content {
  margin: 4px 16px;
  border-top: 1px solid var(--q-list-neutral);
  font-style: italic;
  font-size: 0.8rem;
}
</style>
