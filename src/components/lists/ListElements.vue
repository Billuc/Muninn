<script setup lang="ts">
import { ListElement } from "@/data/models/List";
import _ from "lodash";
import ListElementVue from "./ListElementVue.vue";
import List from "../common/List.vue";
import NewListElementVue from "./NewListElement.vue";
import { ID } from "@/data/models/ID";

interface ListElementsProps {
  listId: ID;
  elements: ListElement[];
}

const props = defineProps<ListElementsProps>();
</script>

<template>
  <div>
    <List :elements="props.elements">
      <template #element="{ element }">
        <ListElementVue :element="element" />
      </template>
    </List>

    <NewListElementVue :list-id="props.listId" />
  </div>
</template>
