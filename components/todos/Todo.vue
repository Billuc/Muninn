<template>
  <div :class="mergeClasses('m-0', 'flex', 'flex-nowrap', 'gap-x-2')">
    <Checkbox
      :value="todo.done"
      @input="updateDone"
      class="checkbox-secondary"
      ref="checkbox"
    />
    <MultilineInput
      :value="todo.title"
      placeholder="Write here..."
      ref="input"
      @input="debouncedUpdateTitle"
      :class="{
        'w-full': true,
        'line-through': todo.done,
      }"
      detect-enter
      @enter="updateTitleNow"
    />
    <Button
      v-if="todo.id >= 0"
      :icon="faRemove"
      class="btn-circle !btn-xs"
      @click="updateTitleNow('')"
    />
  </div>
</template>

<script setup lang="ts">
import { ToDo } from "~/models/ToDo";
import MultilineInput from "../MultilineInput.vue";
import Checkbox from "../Checkbox.vue";
import _ from "lodash";
import Button from "../Button.vue";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

interface EntryProps {
  todo: ToDo;
}

const props = defineProps<EntryProps>();
const emit = defineEmits(["update:title", "update:done"]);

const { todo } = toRefs(props);
const input = ref(null);
const checkbox = ref(null);

const updateDone = (newDone: boolean) => {
  emit("update:done", newDone);
  (checkbox.value as any)?.reset();
};
const updateTitle = (newTitle: string) => {
  emit("update:title", newTitle);
  (input.value as any)?.resetContent();
};

const debouncedUpdateTitle = _.debounce(updateTitle, 2000);
const updateTitleNow = (newTitle: string) => {
  updateTitle(newTitle);
  debouncedUpdateTitle.cancel();
};
</script>
