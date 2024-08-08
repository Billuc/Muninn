import { container } from 'tsyringe';
import { Plugin } from 'vue';

import Database from '@/data/database/database';
import { FavoriteService } from '@/data/services/favoriteService';
import { JournalMoodService } from '@/data/services/journalMoodService';
import { JournalService } from '@/data/services/journalService';
import { ListElementService } from '@/data/services/listElementService';
import { ListService } from '@/data/services/listService';
import { NoteService } from '@/data/services/noteService';
import { NoteTagService } from '@/data/services/noteTagService';
import { ThemeService } from '@/data/services/themeService';

const containerPlugin: Plugin = (app) => {
  const myContainer = container.createChildContainer();

  myContainer.registerSingleton(Database);
  myContainer.registerSingleton(JournalService);
  myContainer.registerSingleton(ListService);
  myContainer.registerSingleton(ListElementService);
  myContainer.registerSingleton(NoteService);
  myContainer.registerSingleton(NoteTagService);
  myContainer.registerSingleton(JournalMoodService);
  myContainer.registerSingleton(ThemeService);
  myContainer.registerSingleton(FavoriteService);

  app.provide("container", myContainer);
  return app;
};
export default containerPlugin;
