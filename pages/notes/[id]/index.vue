<template>
  <div v-if="note">
    <PageHeading>
      <template #prepend>
        <BackButton to="notes" label="Back to notes" class="mr-4" />
        <TagVue
          v-if="tag"
          :text="tag.title"
          :color="tag.color"
          :icon="tag.icon"
        />
      </template>

      <span class="mx-2">
        {{ note.title }}
      </span>

      <template #append>
        <NoteActions :note="note" />
      </template>
    </PageHeading>
    <Background :icon="faLightbulb" />

    <Note :note="note" />
  </div>
  <div v-else>
    <Background :icon="faLightbulb" />
    <ErrorPage
      :code="404"
      :message="`Note with ID ${noteId} not found !`"
      fallback-url="/notes"
    />
  </div>
</template>

<script setup lang="ts">
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import TagVue from "~/components/TagVue.vue";
import BackButton from "~/components/layout/BackButton.vue";
import Background from "~/components/layout/Background.vue";
import ErrorPage from "~/components/layout/ErrorPage.vue";
import PageHeading from "~/components/layout/PageHeading.vue";
import Note from "~/components/notes/Note.vue";
import NoteActions from "~/components/notes/NoteActions.vue";
import { useNoteStore } from "~/stores/noteStore";

const route = useRoute();
const store = useNoteStore();
const noteId = getOneParam(route.params.id);
const note = getNote();
const tag = computed(() => store.tags.get(note?.tagId ?? ""));

useHead({
  title: `Notes - ${note?.title}`,
});

function getNote() {
  try {
    return store.getNote(noteId);
  } catch {
    return null;
  }
}
</script>
