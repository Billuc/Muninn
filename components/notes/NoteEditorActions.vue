<template>
  <div class="mx-auto">
    <template v-if="props.editing">
      <Button :icon="faSave" @click="save" class="btn-success mx-1">
        Save
      </Button>
    </template>
    <template v-else>
      <Button :icon="faEdit" @click="edit" class="mx-1">Edit</Button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

interface NoteActionsProps {
  editing: boolean;
}

const props = defineProps<NoteActionsProps>();
const emit = defineEmits(["edit", "save"]);

const edit = () => emit("edit");
const save = () => emit("save");
</script>
