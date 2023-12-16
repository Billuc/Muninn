import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import ListsView from "@/views/ListsView.vue";
import ListView from "@/views/ListView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeView, name: "home", strict: true },
  { path: "/journal", component: HomeView, name: "journal" },
  {
    path: "/lists",
    component: ListsView,
    name: "lists",
  },
  {
    path: "/lists/:id",
    component: ListView,
    name: "list",
  },
  { path: "/calendar", component: HomeView, name: "calendar" },
  { path: "/notes", component: HomeView, name: "notes" },
  { path: "/config", component: HomeView, name: "config" },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
