<script setup lang="ts">
import { List } from "@/data/models/List";
import { useRouter } from "vue-router";

interface ListGridElementProps {
  list: List;
}

const props = defineProps<ListGridElementProps>();
const router = useRouter();

const toList = () =>
  router.push({ name: "list", params: { id: props.list.id } });
</script>

<template>
  <div class="col-12 col-sm-6 col-md-4 q-pb-xs row">
    <QBtn class="col-12" color="primary" @click="toList">
      <QIcon name="fas fa-square-check" color="accent" />
      <QSpace />
      <div>{{ props.list.title }}</div>
      <QSpace />
      <QKnob :max="20" :model-value="10" size="xs" color="accent" />
    </QBtn>
  </div>
</template>
