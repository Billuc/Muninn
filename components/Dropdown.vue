<template>
  <div class="w-52">
    <div
      :class="
        mergeClasses(
          'w-full',
          'inline-flex',
          'relative',
          'peer ',
          'my-dropdown'
        )
      "
    >
      <input type="checkbox" class="absolute opacity-0" :id="props.inputId" />
      <div tabindex="0" :class="props.labelClass" @focus="onLabelFocus">
        <slot name="label"></slot>
      </div>

      <div
        tabindex="0"
        :class="
          mergeClasses(
            'my-dropdown-content',
            'invisible',
            'opacity-0',
            'transition-opacity',
            'duration-200',
            'z-30',
            undefined,
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
            'md:top-full',
            'max-h-56',
            'overflow-y-auto',
            'overflow-x-visible',
            'shadow-xl',
            'p-2',
            'mt-1'
          )
        "
      >
        <slot name="content"></slot>
      </div>
    </div>

    <label
      tabindex="0"
      ref="backdrop"
      :class="
        mergeClasses(
          'bg-black',
          'opacity-0',
          'pointer-events-none',
          'max-md:peer-focus-within:opacity-20',
          'max-md:peer-focus-within:pointer-events-auto',
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
  inputId?: string;
}

const props = defineProps<DropdownProps>();
const emit = defineEmits(["focus"]);
const backdrop = ref<HTMLElement | null>(null);

const onLabelFocus = () => emit("focus");
const blur = () => {
  backdrop.value?.focus();
};
defineExpose({ blur });
</script>

<style>
.my-dropdown:focus-within > .my-dropdown-content {
  visibility: visible;
  opacity: 1;
}
</style>
