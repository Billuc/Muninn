import { injectable } from "tsyringe";
import { v4 } from "uuid";

import { formatDate } from "@/utils/dates";

import Database from "../database/database";
import SubscribableService from "./base/subscribable";

import type {
  CreateJournalEntry,
  JournalEntry,
  UpdateJournalEntry,
} from "../models/Journal";
import type { ID } from "../models/ID";

@injectable()
export class JournalService extends SubscribableService<JournalEntry> {
  private readonly DATE_INDEX = "date";

  constructor(database: Database) {
    super(database, "journal");
  }

  async getForDay(date: Date): Promise<JournalEntry[]> {
    const entries = await this._getAllFromIndex(
      this.DATE_INDEX,
      formatDate(date)
    );
    return entries;
  }

  async create(create: CreateJournalEntry): Promise<JournalEntry> {
    const entry: JournalEntry = {
      date: formatDate(create.date),
      id: v4(),
      text: create.text,
      createdAt: new Date(),
    };
    const created = await this._create(entry);
    return created;
  }

  async update(update: UpdateJournalEntry): Promise<JournalEntry> {
    const entry = await this._get(update.id);
    const updated = await this._update({
      ...entry,
      text: update.text ?? entry.text,
    });
    return updated;
  }

  async remove(id: ID): Promise<void> {
    await this._remove(id);
  }
}
