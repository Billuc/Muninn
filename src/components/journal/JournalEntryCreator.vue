<script setup lang="ts">
import { useService } from "@/composables/useService";
import { JournalService } from "@/data/services/journalService";

interface JournalEntryCreatorProps {
  date: Date;
}

const props = defineProps<JournalEntryCreatorProps>();
const journalService = useService(JournalService);

const onUpdate = async (value: string) => {
  await journalService.create({
    date: props.date,
    text: value,
  });
};
</script>

<template>
  <li class="journal-entry-creator">
    Write here...

    <QPopupEdit
      :model-value="''"
      @update:model-value="onUpdate"
      auto-save
      v-slot="scope"
    >
      <QInput v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
    </QPopupEdit>
  </li>
</template>

<style>
.journal-entry-creator {
  color: #dddddd;
}
</style>
