<template>
  <ul class="list-disc pl-8">
    <Entry
      v-for="entry in dateEntries"
      :entry="entry.text"
      :id="entry.id"
      :date="entry.date"
      :key="`entry-${entry.id}`"
    />
    <AddEntry :date="props.date" />
  </ul>
</template>

<script setup lang="ts">
import { useJournalStore } from "@/stores/journalStore";
import Entry from "./Entry.vue";
import AddEntry from "./AddEntry.vue";

interface EntryListProps {
  date: Date;
}

const props = defineProps<EntryListProps>();
const store = useJournalStore();
const dateEntries = computed(() => store.getEntries(props.date));
</script>
