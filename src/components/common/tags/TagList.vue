<script setup lang="ts">
import List from "@/components/common/List.vue";
import { Tag } from "@/data/models/Tag";

interface TagListProps {
  tags: Tag[];
  selectedIndex: number;
}

const props = defineProps<TagListProps>();
const emit = defineEmits(["select"]);

const onSelect = (e: { element: any; index: number }) => emit("select", e);
</script>

<template>
  <List
    :elements="props.tags"
    @select="onSelect"
    :selected-index="props.selectedIndex"
    class="q-mt-sm"
  >
    <template #element="{ element }">
      <div class="col-3 text-uppercase text-weight-bold">
        {{ element.title }}
      </div>
      <QSpace />
      <QIcon :name="element.icon.join(' ')" class="col-3" />
      <QSpace />
      <QChip :color="element.color" class="col-3" />
    </template>
  </List>
</template>
