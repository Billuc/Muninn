<template>
  <div class="mx-auto">
    <template v-if="props.editing">
      <!-- <Button
        label="Cancel"
        :icon="faCancel"
        @click="cancel"
        class="btn-error mx-1"
      /> -->
      <Button
        label="Save"
        :icon="faSave"
        @click="save"
        class="btn-success mx-1"
      />
    </template>
    <template v-else>
      <Button label="Edit note" :icon="faEdit" @click="edit" class="mx-1" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { faCancel, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

interface NoteActionsProps {
  editing: boolean;
}

const props = defineProps<NoteActionsProps>();
const emit = defineEmits(["edit", "save", "cancel"]);

const edit = () => emit("edit");
const save = () => emit("save");
const cancel = () => emit("cancel");
</script>
