<script setup lang="ts">
import NoteForm from "@/components/notes/NoteForm.vue";
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { NoteService } from "@/data/services/noteService";

const dialogOpened = ref(false);
const noteService = useService(NoteService);

const name = ref("");
const tagId = ref("")
const creating = ref(false);

const createNote = async () => {
  creating.value = true;
  await noteService.create({ title: name.value, tagId: tagId.value, text: "" });

  setTimeout(() => {
    creating.value = false;
    dialogOpened.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <PageAction
      color="primary"
      icon="mdi-plus"
      label="Add Note"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="createNote">
      <template #title>New List</template>

      <template #form>
        <NoteForm v-model:title="name" v-model:tag-id="tagId" />
      </template>

      <template #actions>
        <QBtn type="reset" color="info">Clear</QBtn>
        <QBtn type="submit" color="positive" :loading="creating">Create</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
