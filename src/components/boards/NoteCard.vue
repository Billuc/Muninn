<script setup lang="ts">
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ID } from "@/data/models/ID";
import { NoteService } from "@/data/services/noteService";
import { ref } from "vue";
import CardBase from "./CardBase.vue";
import TextEditor from "./TextEditor.vue";
import DeleteNote from "../notes/DeleteNote.vue";
import { NoteOnlineService } from "@/data/services/noteOnlineService";
import { Note } from "@/data/models/Note";
import TitleEditor from "./TitleEditor.vue";

interface NoteCardProps {
  id: ID;
  online: boolean;
}

const noteOfflineService = useService(NoteService);
const noteOnlineService = useService(NoteOnlineService);

const props = defineProps<NoteCardProps>();
const emit = defineEmits(["up", "down"]);

const noteService = props.online ? noteOnlineService : noteOfflineService;

const noteCardData = await noteService.get(props.id);
const noteCard = ref<Note>(noteCardData);
useSubscription(noteService, noteCard);

// Lock to send update requests only when the previous one finished
const locked = ref<boolean>(false);
const lastTextValue = ref(noteCardData.text);

const onTitleChange = async (newTitle: string) => {
  await noteService.update({
    ...noteCard.value,
    title: newTitle,
  });
};

const onTextChange = async (newText: string) => {
  lastTextValue.value = newText;
  checkIfUpdateIsNeeded();
};

function checkIfUpdateIsNeeded() {
  if (locked.value == true) {
    // We don't wait for the lock because we call this function back when it is unlocked
    return;
  }

  if (lastTextValue.value !== noteCard.value.text) {
    // Update needed
    // Set locked to true and send the request
    locked.value = true;
    noteService
      .update({
        ...noteCard.value,
        text: lastTextValue.value,
      })
      .then((_) => {
        locked.value = false;
        checkIfUpdateIsNeeded();
      });
  }
}
</script>

<template>
  <CardBase @up="() => emit('up')" @down="() => emit('down')" v-if="noteCard">
    <TitleEditor
      class="text-h6 text-weight-bold"
      :model-value="noteCard.title"
      placeholder="Title"
      @update:model-value="onTitleChange"
    />
    <TextEditor
      :model-value="noteCard.text"
      placeholder="Paragraph"
      class="montserrat"
      @update:model-value="onTextChange"
      :debounce="1000"
    />

    <template #actions>
      <DeleteNote :note="noteCard" :online="props.online" />
    </template>
  </CardBase>
</template>
