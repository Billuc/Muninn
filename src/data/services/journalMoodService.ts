import { injectable } from "tsyringe";
import { v4 } from "uuid";

import { formatDate } from "@/utils/dates";

import Database from "../database/database";
import SubscribableService from "./base/subscribable";

import type { JournalMood, UpdateJournalMood } from "../models/Journal";
import type { ID } from "../models/ID";

@injectable()
export class JournalMoodService extends SubscribableService<JournalMood> {
  private readonly DATE_INDEX = "date";

  constructor(database: Database) {
    super(database, "journal-moods");
  }

  async getForDay(date: Date): Promise<JournalMood | null> {
    const moodsAtDay = await this._getAllFromIndex(
      this.DATE_INDEX,
      formatDate(date)
    );

    if (!moodsAtDay.length) return null;

    return moodsAtDay[0];
  }

  async update(update: UpdateJournalMood): Promise<JournalMood> {
    const updated = await this._update({
      id: update.id ?? v4(),
      date: formatDate(update.date),
      mood: update.mood,
    });
    return updated;
  }

  async remove(id: ID): Promise<void> {
    await this._remove(id);
  }
}
