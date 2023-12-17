<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import EditNote from "@/components/notes/EditNote.vue";
import DeleteNote from "@/components/notes/DeleteNote.vue";
import PageActions from "@/components/common/PageActions.vue";
import BackButton from "@/components/common/BackButton.vue";
import NoteEditor from "@/components/notes/NoteEditor.vue";
import NoteModeToggle from "@/components/notes/NoteModeToggle.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getOneParam } from "@/utils/route";
import { NoteService } from "@/data/services/noteService";

const noteService = useService(NoteService);
const route = useRoute();
const noteId = getOneParam(route.params.id);

const noteData = await noteService.get(noteId);
const note = ref(noteData);
useSubscription(noteService, note);

const noteText = ref(note.value.text);
const editing = ref(false);
</script>

<template>
  <div>
    <Title>
      <template #prefix><BackButton name="lists" /></template>
      <template #text>{{ note.title }}</template>
    </Title>

    <PageActions>
      <EditNote :note="note" />
      <DeleteNote :note="note" />
      <NoteModeToggle v-model:editing="editing" />
    </PageActions>

    <NoteEditor v-model="noteText" :readonly="!editing" class="q-mt-sm" />
  </div>
</template>
