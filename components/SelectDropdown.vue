<template>
  <Dropdown :labelClass="props.labelClass" ref="dropdown">
    <template #label>
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
    </template>

    <template #content>
      <template v-if="options.length > 0">
        <DropdownList
          :elements="props.options"
          :selected="props.value"
          @select="select"
          :flat="props.flatList"
        >
          <template #element="{ element, onSelect, selected }">
            <slot
              name="option"
              :option="element"
              :onSelect="onSelect"
              :selected="selected"
            >
            </slot>
          </template>
        </DropdownList>
      </template>

      <template v-else>
        <slot name="no-option">
          <div class="text-sm italic font-light text-center">No option</div>
        </slot>
      </template>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import Dropdown from "./Dropdown.vue";
import DropdownList from "./DropdownList.vue";

interface SelectOption {
  text: string;
  value: string;
}

interface SelectDropdownProps {
  options: SelectOption[];
  value: string;
  placeholder?: string;
  labelClass?: string;
  flatList?: boolean;
}

const props = defineProps<SelectDropdownProps>();
const emit = defineEmits(["update:value"]);
const dropdown = ref<InstanceType<typeof Dropdown> | null>(null);

const selected = computed(() =>
  props.options.find((o) => o.value === props.value)
);

const select = (opt: string) => {
  emit("update:value", opt);
  dropdown.value?.blur();
};
</script>
