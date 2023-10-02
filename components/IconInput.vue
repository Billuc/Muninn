<template>
  <AutocompleteField
    label="Icon"
    placeholder="Search icons..."
    :icon="faIcons"
    :options="iconOptions"
    :value="serialize(props.icon ?? [''])"
    @update:value="onInput"
    :clearable="props.clearable"
  >
    <template #selected="{ selected }">
      <div>
        <FontAwesomeIcon :icon="deserialize(selected.value)" />
        {{ selected.text }}
      </div>
    </template>

    <template #option="{ option, onSelect }">
      <div @click="onSelect" class="hover:bg-base-100 rounded-box px-2">
        <FontAwesomeIcon :icon="deserialize(option.value)" />
        {{ option.text }}
      </div>
    </template>

    <template #no-option>
      <div class="text-sm italic font-light text-center">
        No icon found...
      </div>
    </template>
  </AutocompleteField>
</template>

<script setup lang="ts">
import { faIcons, fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import _ from "lodash";
import AutocompleteField from "./AutocompleteField.vue";

interface IconInputProps {
  icon?: string[];
  clearable?: boolean;
}

const props = defineProps<IconInputProps>();
const emit = defineEmits(["update:icon"]);

const SEPARATOR = "___";
const serialize = (icon: string[]) => _.join(icon, SEPARATOR);
const deserialize = (serializedIcon: string) =>
  _.split(serializedIcon, SEPARATOR);

const iconOptions = _([...Object.values(fas), ...Object.values(fab)])
  .chain()
  .map((icon) => ({
    text: icon.iconName,
    value: serialize([icon.prefix, icon.iconName]),
  }))
  .uniqBy((tv) => tv.value)
  .value();

const onInput = (v: string) => emit("update:icon", deserialize(v));
</script>
