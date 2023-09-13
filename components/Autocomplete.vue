<template>
  <div :class="mergeClasses('w-full', 'dropdown')">
    <label
      v-if="props.label"
      :class="
        mergeClasses(
          'label',
          'badge',
          'badge-ghost',
          'relative',
          '-mb-2',
          'ml-4',
          'z-[1]',
          'px-2'
        )
      "
    >
      <span class="label-text">{{ props.label }}</span>
    </label>

    <input
      type="text"
      :placeholder="props.placeholder"
      :class="
        mergeClasses(
          'input',
          'input-bordered',
          'w-full',
          'hover:brightness-95',
          'focus:brightness-100',
          'transition-all',
          'duration-200',
          props.inputClass
        )
      "
      :value="inputValue"
      @input="onInput"
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
          'max-h-52'
        )
      "
    >
      <template v-if="filteredOptions.length > 0">
        <li
          v-for="(opt, index) in filteredOptions"
          :key="`autocomplete-option-${index}`"
        >
          <button @click="() => selectOption(opt)">
            {{ opt[props.textKey ?? "text"] }}
          </button>
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
interface AutocompleteProps {
  label?: string;
  inputClass?: string;
  placeholder?: string;
  options: any[];
  textKey?: string;
  valueKey?: string;
}

const props = defineProps<AutocompleteProps>();
const emit = defineEmits(["input", "newOption"]);
const inputValue = ref("");

const filteredOptions = computed(() =>
  props.options.filter((v) => {
    const vText = v[props.textKey ?? "text"] ?? "";
    return vText.toLowerCase().startsWith(inputValue.value.toLowerCase());
  })
);

const onInput = (ev: any) => (inputValue.value = ev.target.value);
const selectOption = (option: any) =>
  emit("input", option[props.valueKey ?? "value"]);
const newOption = () => emit("newOption", inputValue.value);
</script>
