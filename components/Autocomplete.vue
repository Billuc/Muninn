<template>
  <div :class="mergeClasses('w-full', 'dropdown')">
    <Input
      :label="props.label"
      type="text"
      :placeholder="props.placeholder"
      @input="onInput"
      :value="inputValue"
      :class="props.inputClass"
    />

    <ul
      :class="
        mergeClasses(
          'dropdown-content',
          'menu',
          'border',
          'z-10',
          'p-2',
          'shadow',
          'bg-base-100',
          'rounded-box',
          'w-56',
          'max-h-52',
          'flex',
          'flex-col',
          'flex-nowrap',
          'overflow-y-auto'
        )
      "
    >
      <template v-if="filteredOptions.length > 0">
        <li
          v-for="(opt, index) in filteredOptions"
          :key="`autocomplete-option-${index}`"
        >
          <slot
            name="option"
            :option="opt"
            :index="index"
            :textKey="props.textKey"
            :selectOption="() => selectOption(opt)"
          >
            <button @click="() => selectOption(opt)">
              {{ opt[props.textKey ?? "text"] }}
            </button>
          </slot>
        </li>
      </template>
      <template v-else>
        <li>
          <slot
            name="no-option"
            :new-option="newOption"
            :input-value="inputValue"
          >
            <button @click="newOption">New option : {{ inputValue }}</button>
          </slot>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Input from "./Input.vue";
import _ from "lodash";

interface AutocompleteProps {
  label?: string;
  inputClass?: string;
  placeholder?: string;
  options: any[];
  textKey?: string;
  valueKey?: string;
  lazy?: boolean;
}

const props = defineProps<AutocompleteProps>();
const emit = defineEmits(["input", "newOption"]);
const inputValue = ref("");

const filteredOptions = computed(() =>
  props.options.filter((v) => {
    const vText = v[props.textKey ?? "text"] ?? "";
    return (
      (!props.lazy ||
        vText.toLowerCase() === inputValue.value.toLowerCase() ||
        inputValue.value.length >= 3) &&
      _.includes(vText.toLowerCase(), inputValue.value.toLowerCase())
    );
  })
);

const onInput = (ev: any) => (inputValue.value = ev.target.value);
const selectOption = (option: any) =>
  emit("input", option[props.valueKey ?? "value"]);
const newOption = () => emit("newOption", inputValue.value);
</script>
