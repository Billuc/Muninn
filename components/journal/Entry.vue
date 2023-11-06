<template>
  <li class="m-0 marker:text-neutral">
    <div class="flex flex-nowrap">
      <MultilineInput
        :value="elementText"
        placeholder="Write here..."
        class="w-full"
        detect-enter
        @enter="updateNow"
        @update:value="updateText"
      />

      <JournalEntryActions @remove="remove" />
    </div>
  </li>
</template>

<script setup lang="ts">
import _ from "lodash";
import { SyncStatus } from "~/data/models/Status";
import { useGeneralStore } from "~/data/stores/generalStore";
import { type ID } from "~/data/models/ID";
import { JournalService } from "~/data/services/journalService";

interface EntryProps {
  entry: string;
  id: ID;
  date: Date;
}

const props = defineProps<EntryProps>();
const generalStore = useGeneralStore();
const journalService = useService(JournalService);

const elementText = ref(props.entry);

const { loading: removing, execute: remove } = useAsyncAction(() => journalService.remove(props.id));
const { loading: updating, execute: update } = useAsyncAction(async () => {
  if (!elementText.value) await journalService.remove(props.id);
  else await journalService.update({
    id: props.id,
    date: props.date,
    text: elementText.value
  });

  generalStore.setSyncStatus(SyncStatus.Synced);
})

const updateText = (newText: string) => {
  elementText.value = newText;
  generalStore.setSyncStatus(SyncStatus.Syncing);
  debouncedUpdate(null);
};
const debouncedUpdate = _.debounce(update, 2000);
const updateNow = () => {
  debouncedUpdate.cancel();
  update(null);
};
</script>
