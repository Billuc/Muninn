<template>
  <Select
    label="Tag Color"
    placeholder="Choose a tag color"
    :value="props.value"
    :options="colorOptions"
    @input="onInput"
  >
  </Select>
</template>

<script setup lang="ts">
import { TagColor } from "~/models/Tag";
import Select from "../Select.vue";
import _ from "lodash";

interface TagColorInputProps {
  disabledColors: TagColor[];
  value: TagColor;
}

const props = defineProps<TagColorInputProps>();
const emit = defineEmits(["input"]);

const colorOptions = computed(() =>
  _.difference(Object.values(TagColor), props.disabledColors)
);

const onInput = (v: TagColor) => {
  emit('input', v);
};
</script>
