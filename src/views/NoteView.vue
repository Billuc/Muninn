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
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getOneParam } from "@/utils/route";
import { NoteService } from "@/data/services/noteService";
import { NoteTagService } from "@/data/services/noteTagService";
import TagChip from "@/components/common/tags/TagChip.vue";
import { Tag } from "@/data/models/Tag";

const noteService = useService(NoteService);
const noteTagService = useService(NoteTagService);
const route = useRoute();
const noteId = getOneParam(route.params.id);

const noteData = await noteService.get(noteId);
const note = ref(noteData);
useSubscription(noteService, note);

const tagData = await noteTagService.get(note.value.tagId);
const noteTag = ref<Tag | null>(tagData);

const noteText = ref(note.value.text);
const editing = ref(false);

watch([editing], () => {
  if (!editing.value) {
    noteService.update({
      ...note.value,
      text: noteText.value,
    });
  }
});
watch([note], async () => {
  if (!note.value.tagId) {
    noteTag.value = null;
    return;
  }
  if (note.value.tagId == noteTag.value?.id) return;

  noteTag.value = await noteTagService.get(note.value.tagId);
});
</script>

<template>
  <div>
    <Title>
      <template #prefix><BackButton name="notes" /></template>
      <template #text>{{ note.title }}</template>
      <template #suffix>
        <TagChip :tag="noteTag" no-text v-if="noteTag" />
      </template>
    </Title>

    <PageActions>
      <EditNote :note="note" />
      <DeleteNote :note="note" />
      <NoteModeToggle v-model:editing="editing" />
    </PageActions>

    <NoteEditor v-model="noteText" :readonly="!editing" class="q-mt-md" />
  </div>
</template>
