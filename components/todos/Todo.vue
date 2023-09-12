<template>
  <div
    :class="
      mergeClasses('m-0', 'flex', 'flex-nowrap', 'items-center', 'gap-x-2')
    "
  >
    <FontAwesomeIcon :icon="faBars" class="handle cursor-pointer" />
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
      @click="removeTodo"
    />
  </div>
</template>

<script setup lang="ts">
import { ToDo } from "~/models/ToDo";
import MultilineInput from "../MultilineInput.vue";
import Checkbox from "../Checkbox.vue";
import Button from "../Button.vue";
import { faBars, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useTodoStore } from "~/stores/todoStore";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface EntryProps {
  listId: number;
  todo: ToDo;
}

const props = defineProps<EntryProps>();
const store = useTodoStore();

const { todo } = toRefs(props);
const input = ref(null);
const checkbox = ref(null);

const updateDone = (newDone: boolean) => {
  store.editTodo(props.listId, todo.value.id, todo.value.title, newDone);
  (checkbox.value as any)?.reset();
};
const updateTitle = (newTitle: string) => {
  if (!newTitle) store.removeTodo(props.listId, todo.value.id);
  else store.editTodo(props.listId, todo.value.id, newTitle, todo.value.done);
};
const removeTodo = () => {
  store.removeTodo(props.listId, todo.value.id);
};

const debouncedUpdateTitle = _.debounce(updateTitle, 2000);
const updateTitleNow = (newTitle: string) => {
  updateTitle(newTitle);
  debouncedUpdateTitle.cancel();
};
</script>
