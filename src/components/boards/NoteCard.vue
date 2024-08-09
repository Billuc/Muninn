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

const noteCardData = await noteService.get(props.id);
const noteCard = ref<any>(noteCardData);
useSubscription(noteService, noteCard);

const onTitleChange = async (newTitle: string) => {
  await noteService.update({
    ...noteCard.value,
    title: newTitle,
  });
};

const onTextChange = async (newText: string) => {
  await noteService.update({
    ...noteCard.value,
    text: newText,
  });
};
</script>

<template>
  <CardBase>
    <TextEditor
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
    />
  </CardBase>
</template>
