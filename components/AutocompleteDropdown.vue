<template>
  <Dropdown :label-class="props.labelClass" ref="dropdown" @focus="onFocus">
    <template #label>
      <template v-if="selected">
        <slot name="selected" :selected="selected">
          <span>{{ selected.text }}</span>
        </slot>
      </template>
      <template v-else>
        <slot name="placeholder" :placeholder="props.placeholder">
          <span class="opacity-50">{{ props.placeholder }}</span>
        </slot>
      </template>
    </template>

    <template #content>
      <Input
        ref="input"
        v-model:value="search"
        :input-class="
          mergeClasses(
            'focus:outline-none',
            'bg-base-200',
            'focus:bg-base-300',
            'rounded-box',
            'px-2',
            'w-full',
            'block',
            'mb-2'
          )
        "
        placeholder="Search for icons..."
        clearable
        @clear="search = ''"
      />

      <template v-if="filteredOptions.length > 0">
        <div v-for="(opt, i) in filteredOptions" :key="'option-' + i">
          <slot
            name="option"
            :option="opt"
            :onSelect="() => select(opt)"
            :selected="opt.value === props.value"
          >
            <div
              @click="() => select(opt)"
              class="px-2 rounded-box hover:bg-base-100"
              :class="{ 'bg-base-100': opt.value === props.value }"
            >
              {{ opt.text }}
            </div>
          </slot>
        </div>
      </template>

      <template v-else>
        <slot name="no-option" :createOption="createOption" :search="search">
          <button @click="() => createOption(search)">
            New option : {{ search }}
          </button>
        </slot>
      </template>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import Input from "./Input.vue";
import Dropdown from "./Dropdown.vue";
import _ from "lodash";

interface AutocompleteOption {
  text: string;
  value: string;
}

interface AutocompleteDropdownProps {
  value: string;
  placeholder?: string;
  options: AutocompleteOption[];
  labelClass?: string;
}

const props = defineProps<AutocompleteDropdownProps>();
const emit = defineEmits(["update:value", "newOption"]);
const dropdown = ref<InstanceType<typeof Dropdown> | null>(null);
const input = ref<HTMLElement | null>(null);

const search = ref("");

const selected = computed(() =>
  props.options.find((o) => o.value === props.value)
);
const filteredOptions = computed(() =>
  props.options.filter(
    (v) =>
      (v.text.toLowerCase() === search.value.toLowerCase() ||
        search.value.length >= 3) &&
      _.includes(v.text.toLowerCase(), search.value.toLowerCase())
  )
);

const onFocus = () => input.value?.focus();
const select = (opt: AutocompleteOption) => {
  emit("update:value", opt.value);
  dropdown.value?.blur();
  input.value?.blur();
};
const createOption = (optionName: string) => emit("newOption", optionName);
</script>
