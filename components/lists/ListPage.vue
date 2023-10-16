<template>
  <div>
    <ListActions
      v-model:hide-checked="hideChecked"
      :list="props.list"
      class="mb-10 -mt-4"
    />

    <ListVue :hide-checked="hideChecked" :list="props.list" />
  </div>
</template>

<script setup lang="ts">
import ListActions from './ListActions.vue';
import ListVue from './ListVue.vue';
import { List } from '~/models/List';

interface ListPageProps {
  list: List;
}

const props = defineProps<ListPageProps>();

const hideChecked = ref(true);
</script>