<script setup lang="ts">
import TagForm from "@/components/common/tags/TagForm.vue";
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref, watchEffect } from "vue";
import { useService } from "@/composables/useService";
import { BoardTagService } from "@/data/services/boardTagService";
import { Tag, TagColor } from "@/data/models/Tag";

interface EditNoteTagProps {
  tag: Tag | null;
}

const boardTagService = useService(BoardTagService);

const props = defineProps<EditNoteTagProps>();

const dialogOpened = ref(false);
const name = ref("");
const icon = ref<string[]>([]);
const color = ref(TagColor.red);
const updating = ref(false);

const editTag = async () => {
  if (!props.tag) return;

  updating.value = true;
  await boardTagService.update({
    ...props.tag,
    title: name.value,
    icon: [...icon.value],
    color: color.value,
  });

  setTimeout(() => {
    updating.value = false;
    dialogOpened.value = false;
  }, 100);
};

watchEffect(() => {
  if (!props.tag) return;

  name.value = props.tag.title;
  icon.value = props.tag.icon;
  color.value = props.tag.color;
});
</script>

<template>
  <div>
    <PageAction
      color="secondary"
      icon="mdi-pen"
      label="Edit board tag"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="editTag">
      <template #title>Edit {{ props.tag?.title }}</template>

      <template #form>
        <TagForm
          v-model:title="name"
          v-model:icon="icon"
          v-model:color="color"
        />
      </template>

      <template #actions>
        <QBtn type="reset" color="info">Clear</QBtn>
        <QBtn type="submit" color="positive" :loading="updating">Save</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
