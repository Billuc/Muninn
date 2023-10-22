<template>
  <div :class="mergeClasses('label', 'gap-2', 'p-0')">
    <label
      :class="
        mergeClasses('w-28', 'flex-shrink-0', 'inline-flex', 'items-center')
      "
      :for="id"
    >
      <slot name="label" :icon="props.icon" :label="props.label">
        <FontAwesomeIcon v-if="props.icon" :icon="props.icon" class="mr-1" />

        <slot name="label-text" :label="props.label">
          <span class="label-text truncate">{{ props.label }}</span>
        </slot>
      </slot>
    </label>

    <div class="flex flex-nowrap flex-shrink w-52">
      <slot
        name="input"
        :inputClass="inputClass"
        :onInput="onInput"
        :value="props.value"
        :id="id"
      >
        <input
          @input="(ev: any) => onInput(ev.target.value)"
          :class="inputClass"
          :value="props.value"
          :id="id"
        />
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
import _ from "lodash";

interface FieldProps {
  label?: string;
  clearable?: boolean;
  icon?: IconDefinition;
  value: string;
  rules?: ((v: string) => boolean)[];
}

const props = defineProps<FieldProps>();
const emit = defineEmits(["clear", "update:value"]);
const form = inject<{
  bind: (uid: number, valid: Ref<boolean>) => void;
  unbind: (uid: number) => void;
}>("form");
const id = _.uniqueId("field-");

const valid = computed(
  () => !props.rules || _.every(props.rules, (rule) => rule(props.value))
);
const inputClass = computed(() =>
  mergeClasses(
    "focus:outline-none",
    "bg-base-200",
    "focus:bg-base-300",
    "text-end",
    "font-semibold",
    "rounded-box",
    "px-2",
    "w-0",
    "flex-grow",
    "flex-shrink",
    "truncate",
    !valid.value ? "border border-error" : undefined
  )
);

const clear = () => emit("clear");
const onInput = (v: string) => emit("update:value", v);

onMounted(() => {
  if (form) form.bind(getCurrentInstance()!.uid, valid);
});
onBeforeUnmount(() => {
  if (form) form.unbind(getCurrentInstance()!.uid);
});
</script>
