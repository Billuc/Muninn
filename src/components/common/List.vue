<script setup lang="ts">
import ListElement from "@/components/common/ListElement.vue";

interface ListProps {
  elements: any[];
  key?: string;
}

const props = defineProps<ListProps>();
const emit = defineEmits(["select"]);

const onClick = (element: any, index: number) =>
  emit("select", { element, index });
</script>

<template>
  <div>
    <ListElement
      v-for="(element, i) in props.elements"
      :key="element[props.key || 'id']"
      :index="i"
      @click="() => onClick(element, i)"
    >
      <slot name="element" :element="element" :index="i" />
    </ListElement>
  </div>
</template>
