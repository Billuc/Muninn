<script setup lang="ts">
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ID } from "@/data/models/ID";
import { computed, ref, watchEffect } from "vue";
import { NoteService } from "@/data/services/noteService";
import NoteGridElement from "../notes/NoteGridElement.vue";
import { NoteTagService } from "@/data/services/noteTagService";
import { Tag } from "@/data/models/Tag";

interface HomeNoteGridElementProps {
  id: ID;
}

const props = defineProps<HomeNoteGridElementProps>();
const noteService = useService(NoteService);
const noteTagService = useService(NoteTagService);

const noteData = await noteService.get(props.id);
const note = ref(noteData);
useSubscription(noteService, note);

const tagData = await noteTagService.get(note.value.tagId);
const noteTag = ref<Tag | null>(tagData ?? null);
useSubscription(noteTagService, noteTag);

const noteAndTag = computed(() => ({
  ...note.value,
  tag: noteTag.value,
}));

watchEffect(async () => {
  if (!note.value.tagId) {
    noteTag.value = null;
  }

  if (note.value.tagId && note.value.tagId !== noteTag.value?.id) {
    noteTag.value = await noteTagService.get(note.value.tagId);
  }
});
</script>

<template>
  <NoteGridElement :note="noteAndTag" v-if="note" />
</template>
