<template>
  <LayoutLoading v-if="pending" />
  <Form ref="form" v-else>
    <InputField
      label="Note Name"
      placeholder="Enter name..."
      :value="props.name"
      :icon="faFont"
      @update:value="setName"
      :rules="[(v) => !!v]"
    />
    <TagSelecter
      :tags="noteTags!"
      :selected="props.tagId"
      @update:selected="setTagId"
      clearable
    />
  </Form>
</template>

<script setup lang="ts">
import type { Form } from "#build/components";
import { faFont } from "@fortawesome/free-solid-svg-icons";
import { type ID } from "~/data/models/ID";
import { NoteTagService } from "~/data/services/noteTagService";

interface NoteFormProps {
  name: string;
  tagId: ID;
}

const props = defineProps<NoteFormProps>();
const emit = defineEmits(["update:name", "update:tagId"]);
const noteTagService = useService(NoteTagService);

const form = ref<InstanceType<typeof Form> | null>(null);
const { pending, data: noteTags } = useLazyAsyncData("note-tags", () =>
  noteTagService.getAll()
);

const setName = (newName: string) => emit("update:name", newName);
const setTagId = (newTagId: ID) => emit("update:tagId", newTagId);

const validate = () => form.value?.validate();
defineExpose({ validate });
</script>
