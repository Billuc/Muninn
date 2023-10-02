<template>
  <ul class="list-disc pl-8">
    <Entry
      v-for="(entry, index) in dateEntries"
      :entry="entry"
      @update:entry="(v) => updateEntry(index, v)"
      @remove="() => removeEntry(index)"
      :key="`entry-${index}`"
    />
    <AddEntry @new-entry="(v) => newEntry(v)" />
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
const { date } = toRefs(props);
const store = useJournalStore();
const dateEntries = computed(() => store.getEntries(date.value));

function updateEntry(index: number, newValue: string) {
  if (!newValue) store.removeEntry(date.value, index);
  else store.editEntry(date.value, index, newValue);
}
function removeEntry(index: number) {
  store.removeEntry(date.value, index);
}
function newEntry(value: string) {
  if (!value) return;
  store.newEntry(date.value, value);
}
</script>
