<script setup lang="ts">
import { useService } from "@/composables/useService";
import { JournalEntry } from "@/data/models/Journal";
import { JournalService } from "@/data/services/journalService";

interface JournalEntryProps {
  entry: JournalEntry;
}

const props = defineProps<JournalEntryProps>();
const journalService = useService(JournalService);

const onUpdate = async (value: string) => {
  if (!value) {
    await journalService.remove(props.entry.id);
  } else {
    await journalService.update({
      id: props.entry.id,
      text: value,
    });
  }
};
</script>

<template>
  <li>
    {{ props.entry.text }}

    <QPopupEdit
      :model-value="props.entry.text"
      @update:model-value="onUpdate"
      auto-save
      v-slot="scope"
    >
      <QInput v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
    </QPopupEdit>
  </li>
</template>
