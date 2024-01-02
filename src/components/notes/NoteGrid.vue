<script setup lang="ts">
import { Note } from "@/data/models/Note";
import List from "@/components/common/List.vue";
import { useRouter } from "vue-router";
import { useService } from "@/composables/useService";
import { NoteTagService } from "@/data/services/noteTagService";
import { computed, ref } from "vue";
import { useSubscription } from "@/composables/useSubscription";
import TagChip from "@/components/common/tags/TagChip.vue";

interface NoteGridProps {
  notes: Note[];
}

const props = defineProps<NoteGridProps>();
const router = useRouter();
const noteTagService = useService(NoteTagService);

const tagData = await noteTagService.getAll();
const tags = ref(tagData);
useSubscription(noteTagService, tags);

const notesWithTags = computed(() =>
  props.notes.map((n) => ({
    note: n,
    tag: tags.value.find((t) => t.id == n.tagId),
  }))
);

const toNote = (v: { element: { note: Note } }) =>
  router.push({
    name: "note",
    params: { id: v.element.note.id },
  });
</script>

<template>
  <List :elements="notesWithTags" @select="toNote">
    <template #element="{ element }">
      <div>{{ element.note.title }}</div>
      <QSpace />
      <TagChip :tag="element.tag" v-if="element.tag" />
    </template>
  </List>
</template>
