<template>
  <div
    :class="
      mergeClasses('m-0', 'flex', 'flex-nowrap', 'items-center', 'gap-x-2')
    "
  >
    <div class="flex flex-nowrap items-center gap-x-4">
      <FontAwesomeIcon :icon="faBars" class="text-base-300" size="lg" />
      <Checkbox
        :value="false"
        disabled
        class="checkbox-primary"
      />
    </div>
    
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
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useListStore } from "~/stores/listStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ID } from "~/models/ID";

interface AddElementProps {
  listId: ID;
  parentId?: ID;
}

const props = defineProps<AddElementProps>();
const store = useListStore();
const elementText = ref("");

const addElement = () => {
  if (!!elementText.value)
    store.newElement(props.listId, elementText.value, props.parentId);
  elementText.value = "";
};
</script>
