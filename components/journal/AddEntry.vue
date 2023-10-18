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
    <Button :icon="faPlus" class="btn-circle !btn-xs" @click="newEntry" />
  </li>
</template>

<script setup lang="ts">
import { useJournalStore } from "~/stores/journalStore";
import MultilineInput from "../MultilineInput.vue";
import Button from "../Button.vue";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface AddEntryProps {
  date: Date;
}

const props = defineProps<AddEntryProps>();
const store = useJournalStore();

const elementText = ref("");

const newEntry = () => {
  if (!!elementText.value.trim())
    store.newEntry(props.date, elementText.value.trim());

  elementText.value = "";
};
</script>
