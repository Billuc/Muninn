<template>
  <li class="m-0">
    <MultilineField
      value=""
      placeholder="Write here..."
      @input="debouncedUpdate"
      class="w-full"
      detect-enter
      @enter="updateNow"
      ref="input"
    />
  </li>
</template>

<script setup lang="ts">
import MultilineField from "../MultilineField.vue";
import _ from "lodash";

const emit = defineEmits(["input"]);

const input = ref(null);

const update = (newValue: string) => {
  emit("input", newValue.trim());
  
  nextTick(() => {
    (input.value as any).reset();
  });
};
const debouncedUpdate = _.debounce(update, 2000);
const updateNow = (newValue: string) => {
  update(newValue);
  debouncedUpdate.cancel();
};
</script>
