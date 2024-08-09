<script setup lang="ts">
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ID } from "@/data/models/ID";
import { NoteService } from "@/data/services/noteService";
import { ref } from "vue";
import CardBase from "./CardBase.vue";
import TextEditor from "./TextEditor.vue";

interface NoteCardProps {
  id: ID;
}

const noteService = useService(NoteService);

const props = defineProps<NoteCardProps>();

// const noteCardData = await noteService.get(props.id);
const noteCard = ref<any>(null);
// useSubscription(noteService, noteCard);

noteCard.value = {
  id: "111",
  title: "i am a note",
  text: "text",
};
</script>

<template>
  <CardBase>
    <TextEditor
      class="text-h6 text-weight-bold"
      :model-value="noteCard.title"
    />
    <TextEditor :model-value="noteCard.text" placeholder="Paragraph" />
  </CardBase>
</template>
