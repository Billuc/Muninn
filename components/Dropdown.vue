<template>
  <div class="w-52">
    <div class="my-dropdown peer">
      <label
        ref="label"
        tabindex="0"
        :class="props.labelClass"
        @focus="onLabelFocus"
      >
        <slot name="label"></slot>
      </label>

      <div
        ref="dropdown"
        tabindex="0"
        :class="
          mergeClasses(
            'my-dropdown-content',
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
        <slot name="content"></slot>
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
import _ from "lodash";

interface DropdownProps {
  labelClass?: string;
}

const props = defineProps<DropdownProps>();
const emit = defineEmits(["focus"]);
const dropdown = ref<HTMLElement | null>(null);
const label = ref<HTMLElement | null>(null);

const onLabelFocus = () => emit("focus");
const blur = () => {
  dropdown.value?.blur();
  label.value?.blur();
};

defineExpose({ blur });
</script>

<style>
.my-dropdown {
  width: 100%;
  position: relative;
  display: inline-flex;
}

.my-dropdown .my-dropdown-content {
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

.my-dropdown:focus-within .my-dropdown-content {
  visibility: visible;
  opacity: 1;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  z-index: 30;
}
</style>
