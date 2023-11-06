<template>
  <li
    :class="
      mergeClasses(
        'm-0',
        'marker:text-base-300',
        'flex',
        'flex-nowrap',
        'items-center',
        'gap-x-2'
      )
    "
  >
    <MultilineInput
      v-model:value="elementText"
      placeholder="Write here..."
      class="w-full"
      detect-enter
      @enter="newEntry"
    />
    <Button :icon="faPlus" class="btn-circle !btn-xs" @click="newEntry" :loading="loading" />
  </li>
</template>

<script setup lang="ts">
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SyncStatus } from "~/data/models/Status";
import { JournalService } from "~/data/services/journalService";
import { useGeneralStore } from "~/data/stores/generalStore";

interface AddEntryProps {
  date: Date;
}

const props = defineProps<AddEntryProps>();
const journalService = useService(JournalService);
const generalStore = useGeneralStore();

const elementText = ref("");

const { loading, execute: newEntry } = useAsyncAction(async () => {
  if (!elementText.value.trim()) {
    elementText.value = "";
    return;
  }
  
  generalStore.setSyncStatus(SyncStatus.Syncing);
  await journalService.create({
    date: props.date,
    text: elementText.value
  });

  elementText.value = "";
  generalStore.setSyncStatus(SyncStatus.Synced);
});
</script>
