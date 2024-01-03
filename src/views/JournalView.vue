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
import { JournalEntry } from "@/data/models/Journal";
import { parseDate } from "@/utils/dates";
import { isSameDay } from "date-fns";

const journalService = useService(JournalService);

const mood = ref(0);
const date = ref(new Date());

function filter(e: JournalEntry) {
  return isSameDay(parseDate(e.date), date.value);
}

const journalData = await journalService.getForDay(date.value);
const journal = ref(journalData);
useSubscription(journalService, journal, filter);

watchEffect(async () => {
  journal.value = await journalService.getForDay(date.value);
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

    <MoodSelect v-model="mood" />
    <JournalEditor :journal="journal" :date="date" />
  </div>
</template>
