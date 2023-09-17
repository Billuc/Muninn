<template>
  <div
    :class="
      mergeClasses('m-0', 'flex', 'flex-nowrap', 'items-center', 'gap-x-2')
    "
  >
    <div class="w-[14px] h-4 flex-shrink-0"></div>
    <Checkbox :value="false" disabled class="checkbox-primary" />
    <MultilineField
      :value="elementText"
      placeholder="Write here..."
      @input="(v) => (elementText = v)"
      class="w-full"
      detect-enter
      @enter="addElement"
    />
    <Button :icon="faPlus" class="btn-circle !btn-xs" @click="addElement" />
  </div>
</template>

<script setup lang="ts">
import MultilineField from "../MultilineField.vue";
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

  elementText.value = "reset"; // trick to reset MultilineField
  nextTick(() => (elementText.value = ""));
};
</script>
