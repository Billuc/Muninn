import { v4 } from "uuid";
import Database from "../database/database";
import { CreateJournalEntry, JournalEntry } from "../models/Journal";
import { ID } from "../models/ID";
import SubscribableService from "./base/subscribable";
import { injectable } from "tsyringe";

@injectable()
export class JournalService extends SubscribableService<JournalEntry> {
  private readonly DATE_INDEX = "date";

  constructor(database: Database) {
    super(database, "journal");
  }

  async getForDay(date: Date): Promise<JournalEntry[]> {
    const entries = await this._getAllFromIndex(this.DATE_INDEX, date);
    return entries;
  }

  async create(create: CreateJournalEntry): Promise<JournalEntry> {
    const entry: JournalEntry = {
      date: create.date,
      id: v4(),
      text: create.text,
    };
    const created = await this._create(entry);
    return created;
  }

  async update(update: JournalEntry): Promise<JournalEntry> {
    const updated = await this._update(update);
    return updated;
  }

  async remove(id: ID): Promise<void> {
    await this._remove(id);
  }
}
