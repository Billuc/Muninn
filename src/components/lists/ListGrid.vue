<script setup lang="ts">
import { List } from "@/data/models/List";
import ListVue from "@/components/common/List.vue";
import { useRouter } from "vue-router";

interface ListGridProps {
  lists: List[];
}

const props = defineProps<ListGridProps>();
const router = useRouter();

const toList = (v: { element: List; index: number }) =>
  router.push({ name: "list", params: { id: v.element.id } });
</script>

<template>
  <ListVue :elements="props.lists" @select="toList">
    <template #element="{ element }">
      <div>{{ element.title }}</div>
      <QSpace />
      <QKnob
        :max="20"
        :model-value="10"
        size="xs"
        color="accent"
        :thickness="0.3"
      />
    </template>
  </ListVue>
</template>
