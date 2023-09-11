<template>
  <div class="inline-block">
    <Button :icon="faPen" @click="openModal" class="text-info btn-ghost" />

    <Dialog :is-opened="isOpened" @close="closeModal">
      <template #title>Edit note "{{ props.note.title }}"</template>
      <template #default>
        <div>
          <TextInput
            label="Note name"
            :value="name"
            placeholder="Enter name..."
            input-class="border-neutral"
            @input="setName"
          />
        </div>
      </template>
      <template #actions>
        <Button class="btn-success" label="Save" @click="editNote"></Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import TextInput from "../TextInput.vue";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Note } from "~/models/Note";
import { useNoteStore } from "~/stores/noteStore";

interface EditNoteProps {
  note: Note;
}

const props = defineProps<EditNoteProps>();
const store = useNoteStore();
const isOpened = ref(false);
const name = ref(props.note.title);

const openModal = () => (isOpened.value = true);
const closeModal = () => (isOpened.value = false);
const setName = (v: string) => (name.value = v);

function editNote() {
  store.editNote(props.note.id, name.value, props.note.text);
  closeModal();
}
</script>
