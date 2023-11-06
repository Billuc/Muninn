<template>
  <LayoutLoading v-if="pending" />
  <div v-else-if="note">
    <LayoutPageHeading>
      <template #prepend>
        <LayoutBackButton to="notes" label="Back to notes" class="mr-4" />
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
        <NotesNoteActions :note="note" />
      </template>
    </LayoutPageHeading>
    <LayoutBackground :icon="faLightbulb" />

    <NotesNote :note="note" />
  </div>
  <div v-else>
    <LayoutBackground :icon="faLightbulb" />
    <LayoutErrorPage
      :code="404"
      :message="`Note with ID ${noteId} not found !`"
      fallback-url="/notes"
    />
  </div>
</template>

<script setup lang="ts">
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import type { Tag } from "~/data/models/Tag";
import { NoteService } from "~/data/services/noteService";
import { NoteTagService } from "~/data/services/noteTagService";

const route = useRoute();
const noteId = getOneParam(route.params.id);
const noteService = useService(NoteService);
const noteTagService = useService(NoteTagService);

const { pending, data: note } = useLazyAsyncData(`note-${noteId}`, () =>
  noteService.get(noteId)
);
useSubscription(noteService, note);

const tag = ref<Tag | null>(null);

watch([note], async () => {
  useHead({
    title: `Notes - ${note.value?.title}`,
  });

  if (note.value) tag.value = await noteTagService.get(note.value.tagId);
});
</script>
