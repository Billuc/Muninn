<script setup lang="ts">
import MoodEmoji from "./MoodEmoji.vue";
import { MOOD_COLORS } from "@/utils/journal";
import { JournalMood } from "@/data/models/Journal";
import { useService } from "@/composables/useService";
import { JournalMoodService } from "@/data/services/journalMoodService";
import { computed } from "vue";
import Card from "../common/Card.vue";

interface MoodSelectProps {
  mood: JournalMood | null;
  date: Date;
}

const props = defineProps<MoodSelectProps>();
const journalMoodService = useService(JournalMoodService);

const moodValue = computed(() => props.mood?.mood ?? 0);

const onSelect = async (v: number) => {
  await journalMoodService.update({
    id: props.mood?.id,
    date: props.date,
    mood: v,
  });
};
</script>

<template>
  <Card title="Your mood today" class="bg-secondary">
    <div class="row justify-between">
      <MoodEmoji
        v-for="i in 5"
        :key="i"
        :value="i"
        :color="MOOD_COLORS[i]"
        :active="moodValue == i"
        @select="() => onSelect(i)"
      />
    </div>
  </Card>
</template>
