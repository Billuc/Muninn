import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import BoardsView from "@/views/BoardsView.vue";
import BoardView from "@/views/BoardView.vue";
import ConfigView from "@/views/ConfigView.vue";
import HomeView from "@/views/HomeView.vue";
import ListsView from "@/views/ListsView.vue";
import ListView from "@/views/ListView.vue";
import NotesView from "@/views/NotesView.vue";
import NoteTagsView from "@/views/NoteTagsView.vue";
import NoteView from "@/views/NoteView.vue";

// import LoadingView from "@/views/LoadingView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeView, name: "home", strict: true },
  { path: "/lists", component: ListsView, name: "lists" },
  { path: "/lists/:id", component: ListView, name: "list" },
  { path: "/notes", component: NotesView, name: "notes" },
  { path: "/notes/:id", component: NoteView, name: "note" },
  { path: "/notes/tags", component: NoteTagsView, name: "note-tags" },
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
