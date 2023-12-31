<script setup lang="ts">
import EventTagForm from "@/components/events/tags/EventTagForm.vue";
import FormDialog from "@/components/common/FormDialog.vue";
import PageAction from "@/components/common/PageAction.vue";
import { ref } from "vue";
import { useService } from "@/composables/useService";
import { EventTagService } from "@/data/services/eventTagService";
import { TagColor } from "@/data/models/Tag";

const dialogOpened = ref(false);
const eventTagService = useService(EventTagService);

const name = ref("");
const icon = ref<string[]>([]);
const color = ref(TagColor.red);
const creating = ref(false);

const createEventTag = async () => {
  creating.value = true;
  await eventTagService.create({
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
      color="primary"
      icon="mdi-plus"
      label="Add event tag"
      @click="dialogOpened = true"
    />

    <FormDialog v-model="dialogOpened" @submit="createEventTag">
      <template #title>New event tag</template>

      <template #form>
        <EventTagForm
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
