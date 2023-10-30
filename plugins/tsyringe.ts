import "reflect-metadata";
import { container } from "tsyringe";
import Database from "~/data/database/database";
import { JournalService } from "~/data/services/journalService";
import { ListService } from "~/data/services/listService";

container.registerSingleton(Database);
container.registerSingleton(JournalService);
container.registerSingleton(ListService);

export default defineNuxtPlugin(() => {});
