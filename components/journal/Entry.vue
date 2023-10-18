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

      <EntryActions @remove="remove" />
    </div>
  </li>
</template>

<script setup lang="ts">
import MultilineInput from "../MultilineInput.vue";
import _ from "lodash";
import EntryActions from "./EntryActions.vue";
import { SyncStatus } from "~/models/Status";
import { useGeneralStore } from "~/stores/generalStore";
import { useJournalStore } from "~/stores/journalStore";
import { ID } from "~/models/ID";

interface EntryProps {
  entry: string;
  id: ID;
  date: Date;
}

const props = defineProps<EntryProps>();
const elementText = ref(props.entry);
const store = useJournalStore();
const generalStore = useGeneralStore();

const updateText = (newText: string) => {
  elementText.value = newText;
  generalStore.setSyncStatus(SyncStatus.Syncing);
  debouncedUpdate();
};
const remove = () => store.removeEntry(props.date, props.id);

const update = () => {
  if (!elementText.value) store.removeEntry(props.date, props.id);
  else store.editEntry(props.date, props.id, elementText.value);
  generalStore.setSyncStatus(SyncStatus.Synced);
};
const debouncedUpdate = _.debounce(update, 2000);
const updateNow = () => {
  debouncedUpdate.cancel();
  update();
};
</script>
