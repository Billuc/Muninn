<template>
  <div class="w-full">
    <InputLabel v-if="props.label" :label="props.label" />

    <div
      :class="
        mergeClasses(
          'input',
          'input-bordered',
          'w-full',
          'hover:brightness-95',
          'focus:brightness-100',
          'transition-all',
          'duration-200',
          'flex',
          'flex-nowrap',
          'items-center',
          'gap-1',
          'focus-within:outline',
          'focus-within:outline-2',
          'focus-within:outline-offset-2',
          'focus-within:outline-base-content/20',
          props.class
        )
      "
    >
      <slot
        name="input"
        :attrs="$attrs"
        :type="props.type"
        :placeholder="props.placeholder"
        :pattern="props.pattern"
        :value="props.value"
      >
        <input
          v-bind="$attrs"
          :type="props.type"
          :placeholder="props.placeholder"
          :pattern="props.pattern"
          :class="
            mergeClasses('focus:outline-none', 'flex-grow', 'bg-transparent')
          "
          :value="props.value"
        />
      </slot>

      <Button
        v-if="props.clearable"
        :icon="faRemove"
        class="btn-circle !btn-xs"
        @click="clear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import InputLabel from "./InputLabel.vue";

interface InputProps {
  label?: string;
  value: string;
  placeholder?: string;
  type: string;
  pattern?: string;
  class?: string;
  clearable?: boolean;
}

defineOptions({ inheritAttrs: false });
const props = defineProps<InputProps>();
const emit = defineEmits(["clear"]);

const clear = () => emit("clear");
</script>
