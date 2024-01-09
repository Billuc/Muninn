<script setup lang="ts">
import NavBar from "@/components/layout/NavBar.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const mainRoutes = router
  .getRoutes()
  .filter((r) => r.path.split("/").length == 2);

const handleSwipe = (ev: any) => {
  const routeMatchedIndex = mainRoutes.findIndex(
    (r) => router.currentRoute.value.path.split("/")[1] == r.path.split("/")[1]
  );

  let newIndex =
    (ev.direction == "left"
      ? routeMatchedIndex + 1
      : routeMatchedIndex + mainRoutes.length - 1) % mainRoutes.length;

  router.push(mainRoutes[newIndex]);
};
</script>

<template>
  <div style="height: 100%" class="q-py-sm">
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
  max-width: 95%;
  margin: auto;
  position: relative;
  height: 100%;
}
</style>
