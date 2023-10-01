<template>
  <li class="m-0 marker:text-base-300">
    <MultilineField
      :value="elementText"
      placeholder="Write here..."
      @input="(v) => (elementText = v)"
      class="w-full"
      detect-enter
      @enter="addEntry"
    />
  </li>
</template>

<script setup lang="ts">
import MultilineField from "../MultilineField.vue";
import _ from "lodash";

const emit = defineEmits(["input"]);

const elementText = ref("");

const addEntry = (newValue: string) => {
  emit("input", newValue.trim());
  elementText.value = "";
};
</script>
