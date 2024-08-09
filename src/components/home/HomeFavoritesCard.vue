<script setup lang="ts">
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ref } from "vue";
import Card from "../common/Card.vue";
import ListVue from "../common/List.vue";
import _ from "lodash";
import { FavoriteService } from "@/data/services/favoriteService";
import { useRouter } from "vue-router";
import { Favorite, FavoriteType } from "@/data/models/Favorite";
import HomeBoardGridElement from "./HomeBoardGridElement.vue";

const favoriteService = useService(FavoriteService);
const router = useRouter();

const favoritesData = await favoriteService.getAll();
const favorites = ref(favoritesData);
useSubscription(favoriteService, favorites);

const onSelect = (args: { element: Favorite; index: number }) => {
  switch (args.element.type) {
    case FavoriteType.Board:
      router.push({ name: "board", params: { id: args.element.id } });
      break;
    default:
      throw new Error(`Incorrect favorite type : ${args.element.type}`);
  }
};
</script>

<template>
  <Card title="Favorites">
    <ListVue :elements="favorites" @select="onSelect">
      <template #element="{ element }">
        <HomeBoardGridElement
          :id="element.id"
          v-if="element.type === FavoriteType.Board"
        />
      </template>
    </ListVue>
  </Card>
</template>
