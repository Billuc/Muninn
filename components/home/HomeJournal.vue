<template>
  <div class="card shadow-lg p-1 bg-base-200 min-h-[192px]">
    <div class="text-xl font-semibold text-center mb-2">Today's Journal</div>
    <EntryList :date="props.date" />
  </div>
</template>

<script setup lang="ts">
import EntryList from "../journal/EntryList.vue";

interface HomeJournalProps {
  date: Date;
}

const props = defineProps<HomeJournalProps>();
</script>
