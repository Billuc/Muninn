<template>
  <div
    :class="
      mergeClasses('m-0', 'flex', 'flex-nowrap', 'items-start', 'gap-x-2')
    "
  >
    <div class="flex flex-nowrap, items-center gap-x-2">
      <FontAwesomeIcon :icon="faBars" class="handle cursor-pointer" />
      <Checkbox
        :value="element.done"
        @input="updateDone"
        class="checkbox-primary"
        ref="checkbox"
      />
    </div>
    <MultilineField
      :value="element.title"
      placeholder="Write here..."
      @input="debouncedUpdateTitle"
      :class="{
        'flex-grow': true,
        '!leading-5': true,
        'line-through': element.done,
      }"
      detect-enter
      @enter="updateTitleNow"
    />
    <Button
      v-if="element.id >= 0"
      :icon="faRemove"
      class="btn-circle !btn-xs"
      @click="removeElement"
    />
  </div>
</template>

<script setup lang="ts">
import MultilineField from "../MultilineField.vue";
import Checkbox from "../Checkbox.vue";
import Button from "../Button.vue";
import { faBars, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useListStore } from "~/stores/listStore";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ListElement } from "~/models/List";

interface ListElementVueProps {
  listId: number;
  element: ListElement;
}

const props = defineProps<ListElementVueProps>();
const store = useListStore();

const { element } = toRefs(props);
const checkbox = ref(null);

const updateDone = (newDone: boolean) => {
  store.editElement(
    props.listId,
    element.value.id,
    element.value.title,
    newDone
  );
  (checkbox.value as any)?.reset();
};
const updateTitle = (newTitle: string) => {
  if (!newTitle) store.removeElement(props.listId, element.value.id);
  else
    store.editElement(
      props.listId,
      element.value.id,
      newTitle,
      element.value.done
    );
};
const removeElement = () => {
  store.removeElement(props.listId, element.value.id);
};

const debouncedUpdateTitle = _.debounce(updateTitle, 2000);
const updateTitleNow = (newTitle: string) => {
  updateTitle(newTitle);
  debouncedUpdateTitle.cancel();
};
</script>
