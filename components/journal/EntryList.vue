<template>
  <LayoutLoading v-if="pending" />
  <ul class="list-disc pl-8" v-else>
    <JournalEntry
      v-for="entry in entries"
      :entry="entry.text"
      :id="entry.id"
      :date="entry.date"
      :key="`entry-${entry.id}`"
    />
    <JournalAddEntry :date="props.date" />
  </ul>
</template>

<script setup lang="ts">
import { JournalService } from "~/data/services/journalService";

interface EntryListProps {
  date: Date;
}

const props = defineProps<EntryListProps>();
const journalService = useService(JournalService);

const { pending, data: entries } = useLazyAsyncData(
  `entries-${props.date.toDateString()}`,
  () => journalService.getForDay(props.date)
);
</script>
