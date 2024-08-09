import { container } from "tsyringe";
import { Plugin } from "vue";

import Database from "@/data/database/database";
import { BoardService } from "@/data/services/boardService";
import { BoardTagService } from "@/data/services/boardTagService";
import { FavoriteService } from "@/data/services/favoriteService";
import { ListElementService } from "@/data/services/listElementService";
import { ListService } from "@/data/services/listService";
import { NoteService } from "@/data/services/noteService";
import { ThemeService } from "@/data/services/themeService";

const containerPlugin: Plugin = (app) => {
  const myContainer = container.createChildContainer();

  myContainer.registerSingleton(Database);
  myContainer.registerSingleton(ListService);
  myContainer.registerSingleton(ListElementService);
  myContainer.registerSingleton(NoteService);
  myContainer.registerSingleton(BoardTagService);
  myContainer.registerSingleton(ThemeService);
  myContainer.registerSingleton(FavoriteService);
  myContainer.registerSingleton(BoardService);

  app.provide("container", myContainer);
  return app;
};
export default containerPlugin;
