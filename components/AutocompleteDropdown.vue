<template>
  <div class="w-52">
    <div class="my-autocomplete peer">
      <label
        ref="label"
        tabindex="0"
        :class="
          mergeClasses(
            'focus:outline-none',
            'bg-base-200',
            'focus:bg-base-300',
            'text-end',
            'font-semibold',
            'rounded-box',
            'px-2',
            'w-full',
            'block'
          )
        "
        @focus="onLabelFocus"
      >
        <template v-if="selected">
          <slot
            name="selected"
            :selected="selected"
          >
            <span>{{ selected.text }}</span>
          </slot>
        </template>
        <template v-else>
          <slot name="placeholder" :placeholder="props.placeholder">
            <span class="opacity-50">{{ props.placeholder }}</span>
          </slot>
        </template>
      </label>

      <div
        ref="dropdown"
        tabindex="0"
        :class="
          mergeClasses(
            'my-autocomplete-content',
            'bg-base-300',
            'min-w-full',
            'rounded-box',
            'text-center',
            'md:text-end',
            'fixed',
            'md:absolute',
            'bottom-0',
            'left-0',
            'md:bottom-auto',
            'md:left-auto',
            'max-h-56',
            'overflow-y-auto',
            'overflow-x-visible',
            'shadow-xl',
            'p-2'
          )
        "
      >
        <input
          ref="input"
          v-model="search"
          :class="
            mergeClasses(
              'focus:outline-none',
              'bg-base-100',
              'focus:bg-base-200',
              'rounded-box',
              'px-2',
              'w-full',
              'block',
              'mb-2'
            )
          "
          placeholder="Search for icons..."
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
                class="px-2 rounded-box hover:bg-base-200"
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
      </div>
    </div>

    <label
      tabindex="0"
      :class="
        mergeClasses(
          'hidden',
          'bg-black',
          'opacity-0',
          'peer-focus-within:block',
          'peer-focus-within:opacity-20',
          'md:peer-focus-within:hidden',
          'fixed',
          'top-0',
          'bottom-0',
          'left-0',
          'right-0'
        )
      "
    ></label>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";

interface AutocompleteOption {
  text: string;
  value: string;
}

interface AutocompleteDropdownProps {
  value: string;
  placeholder?: string;
  options: AutocompleteOption[];
}

const props = defineProps<AutocompleteDropdownProps>();
const emit = defineEmits(["update:value", "newOption"]);
const dropdown = ref(null);
const label = ref(null);
const input = ref(null);

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

const onLabelFocus = () => {
  (input.value as unknown as HTMLElement).focus();
};
const select = (opt: AutocompleteOption) => {
  emit("update:value", opt.value);
  (dropdown.value as unknown as HTMLElement).blur();
  (input.value as unknown as HTMLElement).blur();
  (label.value as unknown as HTMLElement).blur();
};
const createOption = (optionName: string) => emit("newOption", optionName);
</script>

<style>
.my-autocomplete {
  width: 100%;
  position: relative;
  display: inline-block;
}

.my-autocomplete .my-autocomplete-content {
  visibility: hidden;
  opacity: 0;
  transform-origin: top;
  --tw-scale-x: 0.95;
  --tw-scale-y: 0.95;
  transform: scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transition-duration: 200ms;
}

.my-autocomplete:focus-within .my-autocomplete-content {
  visibility: visible;
  opacity: 1;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  z-index: 20;
}
</style>
