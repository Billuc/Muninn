<script setup lang="ts">
import { NoteAndTag } from "@/data/models/Note";
import List from "@/components/common/List.vue";
import { useRouter } from "vue-router";
import TagChip from "@/components/common/tags/TagChip.vue";

interface NoteGridProps {
  notes: NoteAndTag[];
}

const props = defineProps<NoteGridProps>();
const router = useRouter();

const toNote = (v: { element: NoteAndTag }) =>
  router.push({
    name: "note",
    params: { id: v.element.id },
  });
</script>

<template>
  <List :elements="props.notes" @select="toNote" class="q-mt-sm">
    <template #element="{ element }">
      <div>{{ element.title }}</div>
      <QSpace />
      <TagChip :tag="element.tag" v-if="element.tag" />
    </template>
  </List>
</template>
