<script setup lang="ts">
import { ID } from "@/data/models/ID";
import { FavoriteType } from "@/data/models/Favorite";
import PageAction from "../PageAction.vue";
import { computed, ref } from "vue";
import { useService } from "@/composables/useService";
import { FavoriteService } from "@/data/services/favoriteService";
import { useSubscription } from "@/composables/useSubscription";

interface FavoriteToggleProps {
  id: ID;
  type: FavoriteType;
}

const props = defineProps<FavoriteToggleProps>();

const favoriteService = useService(FavoriteService);

const favoriteData = await favoriteService.get(props.id);
const favorite = ref(favoriteData ?? null);
useSubscription(favoriteService, favorite);

const icon = computed(() => (favorite.value ? "mdi-star" : "mdi-star-outline"));
const label = computed(() =>
  favorite.value ? "Unmark favorite" : "Mark favorite"
);

const onClick = async () => {
  if (favorite.value) {
    await favoriteService.remove(props.id);
  } else {
    favorite.value = await favoriteService.create({
      id: props.id,
      type: props.type,
    });
  }
};
</script>

<template>
  <PageAction color="secondary" :icon="icon" :label="label" @click="onClick" />
</template>
