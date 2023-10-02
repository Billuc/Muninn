<template>
  <li class="m-0 marker:text-neutral">
    <div class="flex flex-nowrap">
      <MultilineInput
        v-model:value="elementText"
        placeholder="Write here..."
        class="w-full"
        detect-enter
        @enter="update"
        @focus="focused = true"
        ref="input"
      />

      <EntryActions
        @validate="update"
        @cancel="cancel"
        @remove="remove"
        v-show="focused"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import MultilineInput from "../MultilineInput.vue";
import _ from "lodash";
import EntryActions from "./EntryActions.vue";

interface EntryProps {
  entry: string;
}

const props = defineProps<EntryProps>();
const emit = defineEmits(["update:entry", "remove"]);
const elementText = ref(props.entry);
const focused = ref(false);
const input = ref(null);

const update = () => {
  emit("update:entry", elementText.value);
  focused.value = false;
  (input.value as any).blur();
};
const cancel = () => {
  elementText.value = props.entry;
  focused.value = false;
};
const remove = () => {
  emit("remove");
  focused.value = false;
};
</script>
