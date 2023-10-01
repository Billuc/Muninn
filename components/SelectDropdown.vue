<template>
  <div class="w-52">
    <div class="my-select peer">
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
      >
        <template v-if="selected">
          <slot name="selected" :selected="selected">
            <span>{{ selected.text }}</span>
          </slot>
        </template>
        <template v-else>
          <slot name="placeholder" :placeholder="props.placeholder">
            <span class="opacity-50">&nbsp;{{ props.placeholder }}</span>
          </slot>
        </template>
      </label>

      <div
        ref="dropdown"
        tabindex="0"
        :class="
          mergeClasses(
            'my-select-content',
            'bg-base-200',
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
        <template v-if="options.length > 0">
          <div v-for="opt in props.options" :key="opt.value">
            <slot
              name="option"
              :option="opt"
              :onSelect="() => select(opt.value)"
              :selected="opt.value === props.value"
            >
              <div
                @click="() => select(opt.value)"
                class="px-2 rounded-box hover:bg-base-100"
                :class="{ 'bg-base-100': opt.value === props.value }"
              >
                {{ opt.text }}
              </div>
            </slot>
          </div>
        </template>

        <template v-else>
          <slot name="no-option">
            <div class="text-sm italic font-light text-center">No option</div>
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
          'bottom-0',
          'left-0',
          'right-0',
          'h-screen',
          'z-20'
        )
      "
    ></label>
  </div>
</template>

<script setup lang="ts">
interface SelectOption {
  text: string;
  value: string;
}

interface SelectDropdownProps {
  options: SelectOption[];
  value: string;
  placeholder?: string;
}

const props = defineProps<SelectDropdownProps>();
const emit = defineEmits(["update:value"]);
const dropdown = ref(null);
const label = ref(null);

const selected = computed(() =>
  props.options.find((o) => o.value === props.value)
);

const select = (opt: string) => {
  emit("update:value", opt);
  (dropdown.value as unknown as HTMLElement).blur();
  (label.value as unknown as HTMLElement).blur();
};
</script>

<style>
.my-select {
  width: 100%;
  position: relative;
  display: inline-block;
}

.my-select .my-select-content {
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

.my-select:focus-within .my-select-content {
  visibility: visible;
  opacity: 1;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  z-index: 30;
}
</style>
