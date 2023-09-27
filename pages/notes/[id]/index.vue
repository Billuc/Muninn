<template>
  <div>
    <PageHeading>
      <template #prepend>
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
        <div class="inline-block">
          <EditNote :note="note" />
          <DeleteNote :note="note" />
        </div>
      </template>
    </PageHeading>
    <Background :icon="faLightbulb" />

    <Note :note="note" />
  </div>
</template>

<script setup lang="ts">
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import TagVue from "~/components/Tag.vue";
import Background from "~/components/layout/Background.vue";
import PageHeading from "~/components/layout/PageHeading.vue";
import DeleteNote from "~/components/notes/DeleteNote.vue";
import EditNote from "~/components/notes/EditNote.vue";
import Note from "~/components/notes/Note.vue";
import { useNoteStore } from "~/stores/noteStore";

const route = useRoute();
const store = useNoteStore();
const noteId = Number(route.params.id);
const note = store.getNote(noteId);
const tag = computed(() => store.tags.get(note.tagId));

useHead({
  title: `Notes - ${note.title}`,
});
</script>
