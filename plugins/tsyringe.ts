import "reflect-metadata";
import { container } from "tsyringe";
import Database from "~/data/database/database";
import { JournalService } from "~/data/services/journalService";
import { ListService } from "~/data/services/listService";
import { ListElementService } from "~/data/services/listElementService";

container.registerSingleton(Database);
container.registerSingleton(JournalService);
container.registerSingleton(ListService);
container.registerSingleton(ListElementService)

export default defineNuxtPlugin(() => {});
