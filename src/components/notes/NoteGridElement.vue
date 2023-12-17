<script setup lang="ts">
import { Note } from "@/data/models/Note";
import { useRouter } from "vue-router";

interface ListGridElementProps {
  note: Note;
}

const props = defineProps<ListGridElementProps>();
const router = useRouter();

const toList = () =>
  router.push({ name: "note", params: { id: props.note.id } });
</script>

<template>
  <div class="col-12 col-sm-6 col-md-4 q-pb-xs row">
    <QBtn class="col-12" color="primary" @click="toList">
      <QIcon name="mdi-feather" color="accent" />
      <QSpace />
      <div>{{ props.note.title }}</div>
      <QSpace />
      <QBadge color="accent">{{ props.note.tagId }}</QBadge>
    </QBtn>
  </div>
</template>
