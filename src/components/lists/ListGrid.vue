<script setup lang="ts">
import { List } from "@/data/models/List";
import ListVue from "@/components/common/List.vue";
import { useRouter } from "vue-router";
import ListGridElement from "./ListGridElement.vue";

interface ListGridProps {
  lists: List[];
}

const props = defineProps<ListGridProps>();
const router = useRouter();

const toList = (v: { element: List; index: number }) =>
  router.push({ name: "list", params: { id: v.element.id } });
</script>

<template>
  <ListVue :elements="props.lists" @select="toList" class="q-mt-sm">
    <template #element="{ element }">
      <ListGridElement :list="element" />
    </template>
  </ListVue>
</template>
