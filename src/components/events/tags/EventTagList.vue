<script setup lang="ts">
import List from "@/components/common/List.vue";
import { Tag } from "@/data/models/Tag";

interface EventTagListProps {
  tags: Tag[];
  selectedIndex: number;
}

const props = defineProps<EventTagListProps>();
const emit = defineEmits(["select"]);

const onSelect = (e: { element: any; index: number }) => emit("select", e);
</script>

<template>
  <List
    :elements="props.tags"
    @select="onSelect"
    :selected-index="props.selectedIndex"
  >
    <template #element="{ element }">
      <div class="col">{{ element.title }}</div>
      <QIcon :name="element.icon.join(' ')" class="col" />
      <QChip :color="element.color" class="col" />
    </template>
  </List>
</template>
