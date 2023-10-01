<template>
  <div :class="mergeClasses('label', 'gap-1', 'p-0')">
    <div>
      <slot name="label" :icon="props.icon" :label="props.label">
        <FontAwesomeIcon v-if="props.icon" :icon="props.icon" class="mr-1" />

        <slot name="label-text" :label="props.label">
          <span class="label-text truncate">{{ props.label }}</span>
        </slot>
      </slot>
    </div>

    <div class="flex flex-shrink w-52">
      <slot
        name="input"
        :inputClass="inputClass"
        :onInput="onInput"
        :attrs="$attrs"
      >
        <input v-bind="$attrs" @input="onInput" :class="inputClass" />
      </slot>

      <slot name="clearable" :clearable="props.clearable">
        <Button
          v-if="props.clearable"
          :icon="faRemove"
          class="btn-circle !btn-xs"
          @click="clear"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconDefinition, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface FieldProps {
  label?: string;
  clearable?: boolean;
  icon?: IconDefinition;
}

defineOptions({ inheritAttrs: false });
const props = defineProps<FieldProps>();
const emit = defineEmits(["clear", "input"]);

const inputClass = mergeClasses(
  "focus:outline-none",
  "bg-base-200",
  "focus:bg-base-300",
  "text-end",
  "font-semibold",
  "rounded-box",
  "px-2",
  "w-52",
  "flex-shrink"
);

const clear = () => emit("clear");
const onInput = (ev: any) => emit("input", ev.target.value);
</script>
