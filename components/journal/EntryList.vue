<template>
  <ul>
    <JournalEntry
      v-for="(entry, index) in dateEntries"
      :entry="entry"
      @update:entry="(v) => updateEntry(index, v)"
      :key="`entry-${index}`"
    />
    <JournalEntry entry="" @update:entry="(v) => newEntry(v)" />
  </ul>
</template>

<script setup lang="ts">
import { useJournalStore } from "@/stores/journalStore";

interface EntryListProps {
  date: Date;
}

const props = defineProps<EntryListProps>();
const { date } = toRefs(props);
const store = useJournalStore();
const dateEntries = computed(() => store.getEntries(date.value));

function updateEntry(index: number, newValue: string) {
  if (!newValue) store.removeEntry(date.value, index);
  else store.editEntry(date.value, index, newValue);
}

function newEntry(value: string) {
  if (!value) return;
  store.newEntry(date.value, value);
}
</script>
