import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import BoardsView from "@/views/BoardsView.vue";
import BoardTagsView from "@/views/BoardTagsView.vue";
import BoardView from "@/views/BoardView.vue";
import ConfigView from "@/views/ConfigView.vue";
import HomeView from "@/views/HomeView.vue";

// import LoadingView from "@/views/LoadingView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeView, name: "home", strict: true },
  { path: "/boards/tags", component: BoardTagsView, name: "board-tags" },
  { path: "/config", component: ConfigView, name: "config" },
  // { path: "/loading", component: LoadingView, name: "loading" },
  { path: "/boards", component: BoardsView, name: "boards" },
  { path: "/boards/:id", component: BoardView, name: "board" },
];

const router = createRouter({
  history: createWebHistory("/Muninn"),
  routes: routes,
});

export default router;
