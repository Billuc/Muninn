<script setup lang="ts">
import NavBar from "@/components/layout/NavBar.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const mainRoutes = router.getRoutes().filter((r) => !r.meta?.swipeIgnore);

const handleSwipe = (ev: any) => {
  const routeMatchedIndex = mainRoutes.findIndex(
    (r) => router.currentRoute.value.path.split("/")[1] == r.path.split("/")[1]
  );

  let newIndex =
    (ev.direction == "left"
      ? (routeMatchedIndex + 1) % mainRoutes.length
      : routeMatchedIndex + mainRoutes.length - 1) % mainRoutes.length;

  router.push(mainRoutes[newIndex]);
};
</script>

<template>
  <div class="q-py-sm">
    <QCard
      id="container"
      v-touch-swipe.horizontal.mouse="handleSwipe"
      flat
      class="bg-transparent"
    >
      <slot />
    </QCard>

    <NavBar />
  </div>
</template>

<style scoped>
#container {
  width: 1024px;
  max-width: 85%;
  margin: auto;
  position: relative;
  min-height: 100vh;
  padding-bottom: 64px;
}
</style>
