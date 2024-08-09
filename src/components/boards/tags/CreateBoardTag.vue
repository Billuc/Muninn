<script setup lang="ts">
import TagForm from "@/components/common/tags/TagForm.vue";
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { BoardTagService } from "@/data/services/boardTagService";
import { TagColor } from "@/data/models/Tag";

const dialogOpened = ref(false);
const boardTagService = useService(BoardTagService);

const name = ref("");
const icon = ref<string[]>([]);
const color = ref(TagColor.red);
const creating = ref(false);

const createTag = async () => {
  creating.value = true;
  await boardTagService.create({
    title: name.value,
    icon: [...icon.value],
    color: color.value,
  });

  setTimeout(() => {
    creating.value = false;
    dialogOpened.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <PageAction
      color="secondary"
      icon="mdi-plus"
      label="Add board tag"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="createTag">
      <template #title>New board tag</template>

      <template #form>
        <TagForm
          v-model:title="name"
          v-model:icon="icon"
          v-model:color="color"
        />
      </template>

      <template #actions>
        <QBtn type="reset" color="info">Clear</QBtn>
        <QBtn type="submit" color="positive" :loading="creating">Create</QBtn>
      </template>
    </FormDialog>
  </div>
</template>
