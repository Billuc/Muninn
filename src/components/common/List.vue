<script setup lang="ts">
import ListElement from "@/components/common/ListElement.vue";

interface ListProps {
  elements: any[];
  key?: string;
  selectedIndex?: number;
  filter?: (el: any) => boolean;
  noColor?: boolean;
}

const props = defineProps<ListProps>();
const emit = defineEmits(["select"]);

const getIndex = (element: any, originalIndex: number): number => {
  if (!props.filter) return originalIndex;

  let newIndex = 0;
  for (let i = 0; i < props.elements.length; i++) {
    if (props.elements[i] == element) return newIndex;
    if (props.filter(props.elements[i])) newIndex++;
  }

  console.warn(`Index not found for element n°${originalIndex}`);
  return -1;
};
const onClick = (element: any, index: number) =>
  emit("select", { element, index });
</script>

<template>
  <div>
    <template
      v-for="(element, i) in props.elements"
      :key="element[props.key || 'id']"
    >
      <ListElement
        v-show="!props.filter || props.filter(element)"
        :index="props.noColor ? 0 : getIndex(element, i)"
        :selected="i == props.selectedIndex"
        @click="() => onClick(element, i)"
      >
        <slot name="element" :element="element" :index="i" />
      </ListElement>
    </template>
  </div>
</template>
