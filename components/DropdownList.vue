<template>
  <div
    :class="
      mergeClasses(
        'overflow-y-auto',
        'max-h-48',
        'snap-y',
        'shadow-[inset_0_0_8px_-2px_black]',
        'rounded-sm',
        'bg-base-100'
      )
    "
  >
    <div v-for="(el, i) in props.elements" :key="'element-' + el.value">
      <slot
        name="element"
        :element="el"
        :index="i"
        :onSelect="() => onSelect(el)"
        :selected="el.value == props.selected"
      >
        <div
          @click="() => onSelect(el)"
          :class="
            mergeClasses(
              'h-8',
              'rounded-sm',
              'w-full',
              'px-2',
              'flex',
              'items-center',
              'justify-center',
              'hover:bg-base-300',
              'hover:shadow-md',
              'hover:font-semibold',
              el.value == props.selected
                ? 'border-2 border-neutral font-semibold bg-base-200'
                : 'border-0',
              'snap-center'
            )
          "
        >
          {{ el.text }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
interface DropdownListElement<T extends string | number> {
  text: string;
  value: T;
}

interface DropdownListProps {
  elements: DropdownListElement<T>[];
  selected?: T;
  emitItem?: boolean;
}

const props = defineProps<DropdownListProps>();
const emit = defineEmits(["select"]);

function onSelect<T extends string | number>(element: DropdownListElement<T>) {
  emit("select", props.emitItem ? element : element.value);
}
</script>
