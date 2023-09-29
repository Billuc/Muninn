<template>
  <SelectAlt
    label="Tag Color"
    placeholder="Choose a tag color"
    :icon="faPalette"
    :value="props.value"
    :options="colorOptions"
    @update:value="onInput"
  >
    <template #selected="{ selected }">
      <TagVue
        :color="selected.value"
        :text="selected.text"
        class="w-full !btn-xs"
      />
    </template>

    <template #option="{ option, onSelect }">
      <TagVue
        :color="option.value"
        :text="option.text"
        @click="onSelect"
        class="w-full hover:scale-95"
      />
    </template>
  </SelectAlt>
</template>

<script setup lang="ts">
import { TagColor } from "~/models/Tag";
import _ from "lodash";
import SelectAlt from "../SelectAlt.vue";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import TagVue from "../Tag.vue";

interface TagColorInputProps {
  disabledColors: TagColor[];
  value: TagColor;
}

const props = defineProps<TagColorInputProps>();
const emit = defineEmits(["input"]);

const colorOptions = computed(() =>
  _(Object.values(TagColor))
    .chain()
    .difference(props.disabledColors)
    .map((c) => ({ text: c, value: c }))
    .value()
);

const onInput = (v: TagColor) => {
  emit("input", v);
};
</script>
