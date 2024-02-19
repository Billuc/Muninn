<script setup lang="ts">
import { JournalEntry } from "@/data/models/Journal";
import JournalEntryEditor from "./JournalEntryEditor.vue";
import JournalEntryCreator from "./JournalEntryCreator.vue";
import { computed } from "vue";
import _ from "lodash";

interface JournalEditorProps {
  journal: JournalEntry[];
  date: Date;
}

const props = defineProps<JournalEditorProps>();

const entries = computed(() => _.sortBy(props.journal, (e) => e.createdAt));
</script>

<template>
  <ul class="journal">
    <JournalEntryEditor
      v-for="entry in entries"
      :key="entry.id"
      :entry="entry"
    />
    <JournalEntryCreator :date="props.date" />
  </ul>
</template>

<style>
.journal {
  line-height: 2rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    transparent calc(1lh - 1px),
    #dddddd 0px
  );
  background-size: 100% 1lh;
  background-position: center calc(1lh - 5px);
}
</style>
