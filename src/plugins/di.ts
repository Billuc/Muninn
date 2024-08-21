import { container } from 'tsyringe';
import { Plugin } from 'vue';

import Database from '@/data/database/database';
import { BoardOnlineService } from '@/data/services/boardOnlineService';
import { BoardService } from '@/data/services/boardService';
import { BoardTagService } from '@/data/services/boardTagService';
import { FavoriteService } from '@/data/services/favoriteService';
import { ListElementOnlineService } from '@/data/services/listElementOnlineService';
import { ListElementService } from '@/data/services/listElementService';
import { ListOnlineService } from '@/data/services/listOnlineService';
import { ListService } from '@/data/services/listService';
import { NoteOnlineService } from '@/data/services/noteOnlineService';
import { NoteService } from '@/data/services/noteService';
import { ThemeService } from '@/data/services/themeService';

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
  myContainer.registerSingleton(BoardOnlineService);
  myContainer.registerSingleton(ListOnlineService);
  myContainer.registerSingleton(ListElementOnlineService);
  myContainer.registerSingleton(NoteOnlineService);

  app.provide("container", myContainer);
  return app;
};
export default containerPlugin;
