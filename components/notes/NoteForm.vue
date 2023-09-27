<template>
  <div class="form-control gap-y-2">
    <InputAlt
      label="Note Name"
      placeholder="Enter name..."
      :value="props.name"
      :icon="faFont"
      @input="setName"
    />
    <TagSelecter
      :tags="store.tagArray"
      :selected="props.tagId"
      @update:selected="setTagId"
      clearable
    />
  </div>
</template>

<script setup lang="ts">
import { faFont } from "@fortawesome/free-solid-svg-icons";
import { useNoteStore } from "~/stores/noteStore";

interface NoteFormProps {
  name: string;
  tagId: number;
}

const props = defineProps<NoteFormProps>();
const emit = defineEmits(["update:name", "update:tagId"]);
const store = useNoteStore();

const setName = (newName: string) => emit("update:name", newName);
const setTagId = (newTagId: number) => emit("update:tagId", newTagId);
</script>
