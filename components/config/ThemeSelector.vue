<template>
  <SelectField
    label="Theme"
    :icon="faPalette"
    v-model:value="value"
    :options="options"
  >
    <template #selected="{ selected }">
      <ThemeDisplay :theme-name="selected.value" disabled />
    </template>
    <template #option="{ option, selected, onSelect }">
      <div class="px-2 py-1">
        <ThemeDisplay
          :theme-name="option.value"
          :selected="selected"
          @click="onSelect"
        />
      </div>
    </template>
  </SelectField>
</template>

<script setup lang="ts">
import _ from "lodash";
import { themeChange } from "theme-change";
import ThemeDisplay from "./ThemeDisplay.vue";
import SelectField from "../SelectField.vue";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

const options = [
  { text: "Light", value: "light" },
  { text: "Dark", value: "dark" },
  { text: "Synthwave", value: "synthwave" },
  { text: "Valentine", value: "valentine" },
  { text: "Cupcake", value: "cupcake" },
];

const value = ref("light");

onMounted(() => {
  themeChange(false);
  value.value = localStorage.getItem("theme") ?? "light";
});
</script>
