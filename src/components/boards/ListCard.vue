<script setup lang="ts">
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ID } from "@/data/models/ID";
import { ListService } from "@/data/services/listService";
import { ref } from "vue";
import CardBase from "./CardBase.vue";
import TextEditor from "./TextEditor.vue";

interface ListCardProps {
  id: ID;
}

const listService = useService(ListService);

const props = defineProps<ListCardProps>();

// const listCardData = await listService.get(props.id);
const listCard = ref<any>(null);
// useSubscription(listService, listCard);

listCard.value = {
  id: "123",
  title: "i am a list",
  hideChecked: false,
};

function onTitleChange(newTitle: string) {
  console.log(newTitle);
}
</script>

<template>
  <CardBase>
    <TextEditor
      class="text-h6 text-weight-bold"
      :model-value="listCard.title"
      @update:model-value="onTitleChange"
    />
  </CardBase>
</template>
