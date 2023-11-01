import "reflect-metadata";
import { container } from "tsyringe";
import Database from "~/data/database/database";

import { JournalService } from "~/data/services/journalService";
import { ListService } from "~/data/services/listService";
import { ListElementService } from "~/data/services/listElementService";
import { NoteService } from "../data/services/noteService";
import { NoteTagService } from "../data/services/noteTagService";
import { EventTagService } from "~/data/services/eventTagService";
import { EventService } from "~/data/services/eventService";

container.registerSingleton(Database);
container.registerSingleton(JournalService);
container.registerSingleton(ListService);
container.registerSingleton(ListElementService);
container.registerSingleton(EventService);
container.registerSingleton(EventTagService);
container.registerSingleton(NoteService);
container.registerSingleton(NoteTagService);

export default defineNuxtPlugin(() => {});
