<template>
  <div
    :class="
      mergeClasses(
        'flex',
        'flex-wrap',
        'items-center',
        'justify-center',
        'gap-x-4',
        'gap-y-2',
        'w-full'
      )
    "
  >
    <div class="flex-grow">
      <Autocomplete
        label="Icon"
        placeholder="Search icons..."
        :options="iconOptions"
        @input="onInput"
      >
        <template #option="{ option, selectOption }">
          <div @click="selectOption" tabindex="0">
            <FontAwesomeIcon :icon="option.value" />
            {{ option.text }}
          </div>
        </template>
        <template #no-option> No icon found... </template>
      </Autocomplete>
    </div>

    <div v-if="props.icon">
      <FontAwesomeIcon :icon="props.icon!" />
      {{ props.icon[1] }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Autocomplete from "./Autocomplete.vue";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface IconInputProps {
  icon?: string[];
}

const props = defineProps<IconInputProps>();
const emit = defineEmits(["input"]);
const iconOptions = [...Object.values(fas), ...Object.values(fab)].map(
  (icon) => ({ text: icon.iconName, value: [icon.prefix, icon.iconName] })
);

const onInput = (v: string) => emit("input", v);
</script>
