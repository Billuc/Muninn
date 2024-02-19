<script setup lang="ts">
import NoteGrid from "@/components/notes/NoteGrid.vue";
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import CreateNote from "@/components/notes/CreateNote.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { computed, ref } from "vue";
import { NoteService } from "@/data/services/noteService";
import ManageNoteTags from "@/components/notes/ManageNoteTags.vue";
import { NoteTagService } from "@/data/services/noteTagService";

const noteService = useService(NoteService);
const noteTagService = useService(NoteTagService);

const notesData = await noteService.getAll();
const notes = ref(notesData);
useSubscription(noteService, notes);

const tagsData = await noteTagService.getAll();
const noteTags = ref(tagsData);
useSubscription(noteTagService, noteTags);

const notesAndTags = computed(() =>
  notes.value.map((n) => ({
    ...n,
    tag: noteTags.value.find((t) => t.id == n.tagId) ?? null,
  }))
);
</script>

<template>
  <div>
    <Title>
      <template #text>Notes</template>
    </Title>

    <PageActions>
      <CreateNote />
      <ManageNoteTags />
    </PageActions>

    <NoteGrid :notes="notesAndTags" />
  </div>
</template>
