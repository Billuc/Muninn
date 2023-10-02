<template>
  <li class="m-0 marker:text-base-300">
    <MultilineInput
      v-model:value="elementText"
      placeholder="Write here..."
      class="w-full"
      detect-enter
      @enter="newEntry"
    />
  </li>
</template>

<script setup lang="ts">
import MultilineInput from "../MultilineInput.vue";

const emit = defineEmits(["new-entry"]);

const elementText = ref("");

const newEntry = (newValue: string) => {
  emit("new-entry", newValue.trim());
  elementText.value = "";
};
</script>
