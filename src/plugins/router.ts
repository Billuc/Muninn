import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import BoardImportView from '@/views/BoardImportView.vue';
import BoardsView from '@/views/BoardsView.vue';
import BoardTagsView from '@/views/BoardTagsView.vue';
import BoardView from '@/views/BoardView.vue';
import ConfigView from '@/views/ConfigView.vue';
import HomeView from '@/views/HomeView.vue';

// import LoadingView from "@/views/LoadingView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeView, name: "home", strict: true },
  { path: "/boards", component: BoardsView, name: "boards" },
  {
    path: "/boards/:id",
    component: BoardView,
    name: "board",
    meta: { swipeIgnore: true },
  },
  {
    path: "/boards/tags",
    component: BoardTagsView,
    name: "board-tags",
    meta: { swipeIgnore: true },
  },
  { path: "/config", component: ConfigView, name: "config" },
  // { path: "/loading", component: LoadingView, name: "loading" },
  {
    path: "/i/:id",
    component: BoardImportView,
    name: "board-import",
    meta: { swipeIgnore: true },
  },
];

const router = createRouter({
  history: createWebHistory("/Muninn"),
  routes: routes,
});

export default router;
