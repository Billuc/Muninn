<template>
  <Form ref="form">
    <InputField
      label="Note Name"
      placeholder="Enter name..."
      :value="props.name"
      :icon="faFont"
      @update:value="setName"
      :rules="[(v) => !!v]"
    />
    <TagSelecter
      :tags="store.tagArray"
      :selected="props.tagId"
      @update:selected="setTagId"
      clearable
    />
  </Form>
</template>

<script setup lang="ts">
import { faFont } from "@fortawesome/free-solid-svg-icons";
import { useNoteStore } from "~/stores/noteStore";
import Form from "~/components/Form.vue";
import InputField from "../InputField.vue";
import TagSelecter from "../TagSelecter.vue";
import { ID } from "~/models/ID";

interface NoteFormProps {
  name: string;
  tagId: ID;
}

const props = defineProps<NoteFormProps>();
const emit = defineEmits(["update:name", "update:tagId"]);
const store = useNoteStore();
const form = ref<InstanceType<typeof Form> | null>(null);

const setName = (newName: string) => emit("update:name", newName);
const setTagId = (newTagId: ID) => emit("update:tagId", newTagId);

const validate = () => form.value?.validate();
defineExpose({ validate });
</script>
