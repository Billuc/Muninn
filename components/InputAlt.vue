<template>
  <div :class="mergeClasses('label', 'gap-1', 'p-0')">
    <div>
      <FontAwesomeIcon v-if="props.icon" :icon="props.icon" class="mr-1" />
      <span class="label-text">{{ props.label }}</span>
    </div>

    <div class="flex-shrink w-52">
      <slot name="input">
        <input
          v-bind="$attrs"
          @input="onInput"
          :class="
            mergeClasses(
              'focus:outline-none',
              'bg-base-100',
              'focus:bg-base-200',
              'text-end',
              'font-semibold',
              'rounded-box',
              'px-2',
              'w-full'
            )
          "
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
import { IconDefinition, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface InputProps {
  label?: string;
  clearable?: boolean;
  icon?: IconDefinition;
}

defineOptions({ inheritAttrs: false });
const props = defineProps<InputProps>();
const emit = defineEmits(["clear", "input"]);

const clear = () => emit("clear");
const onInput = (ev: any) => emit("input", ev.target.value);
</script>
