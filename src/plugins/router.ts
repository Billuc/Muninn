import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import EventsView from "@/views/EventsView.vue";
import EventTagsView from "@/views/EventTagsView.vue";
import HomeView from "@/views/HomeView.vue";
import ListsView from "@/views/ListsView.vue";
import ListView from "@/views/ListView.vue";
import NotesView from "@/views/NotesView.vue";
import NoteTagsView from "@/views/NoteTagsView.vue";
import NoteView from "@/views/NoteView.vue";

// import LoadingView from "@/views/LoadingView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeView, name: "home", strict: true },
  { path: "/journal", component: HomeView, name: "journal" },
  { path: "/lists", component: ListsView, name: "lists" },
  { path: "/lists/:id", component: ListView, name: "list" },
  { path: "/calendar", component: EventsView, name: "calendar" },
  { path: "/calendar/tags", component: EventTagsView, name: "calendar-tags" },
  { path: "/notes", component: NotesView, name: "notes" },
  { path: "/notes/:id", component: NoteView, name: "note" },
  { path: "/notes/tags", component: NoteTagsView, name: "note-tags" },
  { path: "/config", component: HomeView, name: "config" },
  // { path: "/loading", component: LoadingView, name: "loading" },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
