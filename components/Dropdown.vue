<template>
  <div class="w-52">
    <div
      :class="
        mergeClasses('w-full', 'inline-flex', 'relative', 'peer ', 'group')
      "
    >
      <input type="checkbox" class="absolute opacity-0" />
      <div
        tabindex="0"
        :class="props.labelClass"
        @focus="onLabelFocus"
      >
        <slot name="label"></slot>
      </div>

      <div
        tabindex="0"
        :class="
          mergeClasses(
            'invisible',
            'opacity-0',
            'transition-opacity',
            'duration-200',
            'group-focus-within:visible',
            'group-focus-within:opacity-100',
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
            'p-2'
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
}

const props = defineProps<DropdownProps>();
const emit = defineEmits(["focus"]);
const backdrop = ref<HTMLElement | null>(null);

const onLabelFocus = () => emit("focus");
const blur = () => {
  backdrop.value?.focus();
  backdrop.value?.blur();
};
defineExpose({ blur });
</script>
