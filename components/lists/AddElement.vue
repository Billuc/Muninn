<template>
  <div
    :class="
      mergeClasses('m-0', 'flex', 'flex-nowrap', 'items-center', 'gap-x-2')
    "
  >
    <div class="w-[26px] h-4 flex-shrink-0"></div>
    <Checkbox :value="false" disabled class="checkbox-primary" />
    <MultilineInput
      v-model:value="elementText"
      placeholder="Write here..."
      class="w-full"
      detect-enter
      @enter="addElement"
    />
    <Button :icon="faPlus" class="btn-circle !btn-xs" @click="addElement" />
  </div>
</template>

<script setup lang="ts">
import MultilineInput from "../MultilineInput.vue";
import Checkbox from "../Checkbox.vue";
import Button from "../Button.vue";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useListStore } from "~/stores/listStore";

interface AddElementProps {
  listId: number;
}

const props = defineProps<AddElementProps>();
const store = useListStore();
const elementText = ref("");

const addElement = () => {
  if (!!elementText.value) store.newElement(props.listId, elementText.value);
  elementText.value = "";
};
</script>
