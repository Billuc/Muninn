<template>
  <div :class="mergeClasses('label', 'gap-1', 'p-0')">
    <div>
      <FontAwesomeIcon v-if="props.icon" :icon="props.icon" class="mr-1" />
      <span class="label-text">{{ props.label }}</span>
    </div>

    <div>
      <div class="dropdown flex-shrink w-52">
        <label
          tabindex="0"
          v-bind="$attrs"
          :class="
            mergeClasses(
              'focus:outline-none',
              'bg-base-100',
              'focus:bg-base-200',
              'text-end',
              'font-semibold',
              'rounded-box',
              'px-2',
              'w-full',
              'block'
            )
          "
        >
          <slot name="selected" :selected="selected">
            {{ selected?.text }}
          </slot>
        </label>

        <div
          tabindex="0"
          :class="
            mergeClasses(
              'dropdown-content',
              'bg-base-300',
              'w-full',
              'rounded-box',
              'z-[1]',
              'text-end'
            )
          "
        >
          <div v-for="opt in props.options" :key="opt.value">
            <slot
              name="option"
              :option="opt"
              :onSelect="() => select(opt.value)"
            >
              <div
                @click="() => select(opt.value)"
                class="px-2 rounded-box hover:bg-base-200"
              >
                {{ opt.text }}
              </div>
            </slot>
          </div>
        </div>
      </div>

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

interface SelectOption {
  text: string;
  value: string;
}

interface SelectAltProps {
  label?: string;
  clearable?: boolean;
  icon?: IconDefinition;
  options: SelectOption[];
  value: string;
}

defineOptions({ inheritAttrs: false });
const props = defineProps<SelectAltProps>();
const emit = defineEmits(["clear", "update:value"]);

const selected = computed(() =>
  props.options.find((o) => o.value === props.value)
);

const clear = () => emit("clear");
const select = (opt: string) => emit("update:value", opt);
</script>
