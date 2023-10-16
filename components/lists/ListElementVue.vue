<template>
  <div
    :class="
      mergeClasses('m-0', 'flex', 'flex-nowrap', 'items-start', 'gap-x-2')
    "
  >
    <div class="flex flex-nowrap items-center gap-x-4">
      <FontAwesomeIcon :icon="faBars" class="handle cursor-pointer" size="lg" />
      <Checkbox
        :value="done"
        @update:value="updateDone"
        class="checkbox-primary"
        ref="checkbox"
      />
    </div>

    <MultilineInput
      :value="title"
      placeholder="Write here..."
      @update:value="updateTitle"
      :class="
        mergeClasses(
          'flex-grow',
          '!leading-5',
          done ? 'line-through' : undefined
        )
      "
      detect-enter
      @enter="updateNow"
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
import MultilineInput from "../MultilineInput.vue";
import Checkbox from "../Checkbox.vue";
import Button from "../Button.vue";
import { faBars, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useListStore } from "~/stores/listStore";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ListElementDTO } from "~/models/List";

interface ListElementVueProps {
  listId: number;
  element: ListElementDTO;
}

const props = defineProps<ListElementVueProps>();
const store = useListStore();
const checkbox = ref<InstanceType<typeof Checkbox> | null>(null);

const done = ref(props.element.done);
const title = ref(props.element.title);

const updateDone = (newDone: boolean) => {
  done.value = newDone;
  checkbox.value?.reset();
  debouncedUpdate();
};
const updateTitle = (newTitle: string) => {
  title.value = newTitle;
  debouncedUpdate();
};
const removeElement = () => {
  store.removeElement(props.listId, props.element.id);
};

const update = () => {
  if (!title.value) removeElement();
  else
    store.editElement(props.listId, props.element.id, title.value, done.value);
};
const debouncedUpdate = _.debounce(update, 2000);
const updateNow = () => {
  debouncedUpdate.cancel();
  update();
};
</script>
