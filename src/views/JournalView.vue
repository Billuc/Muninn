<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import DateSelect from "@/components/common/DateSelect.vue";
import MoodSelect from "@/components/journal/MoodSelect.vue";
import JournalEditor from "@/components/journal/JournalEditor.vue";
import { useService } from "@/composables/useService";
import { JournalService } from "@/data/services/journalService";
import { useSubscription } from "@/composables/useSubscription";
import { JournalEntry, JournalMood } from "@/data/models/Journal";
import { parseDate } from "@/utils/dates";
import { isSameDay } from "date-fns";
import { JournalMoodService } from "@/data/services/journalMoodService";

const journalService = useService(JournalService);
const journalMoodService = useService(JournalMoodService);

const date = ref(new Date());

function filterEntry(e: JournalEntry) {
  return isSameDay(parseDate(e.date), date.value);
}
function filterMood(e: JournalMood) {
  return isSameDay(parseDate(e.date), date.value);
}

const journalData = await journalService.getForDay(date.value);
const journal = ref(journalData);
useSubscription(journalService, journal, filterEntry);

const moodData = await journalMoodService.getForDay(date.value);
const mood = ref(moodData);
useSubscription(journalMoodService, mood, filterMood);

watchEffect(async () => {
  journal.value = await journalService.getForDay(date.value);
  mood.value = await journalMoodService.getForDay(date.value);
});
</script>

<template>
  <div>
    <Title>
      <template #text>Journal</template>
    </Title>

    <PageActions>
      <DateSelect v-model="date" />
    </PageActions>

    <div class="q-pt-md">
      <MoodSelect :mood="mood" :date="date" />
    </div>
    <JournalEditor :journal="journal" :date="date" />
  </div>
</template>
