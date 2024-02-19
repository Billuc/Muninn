import { IDBPDatabase, IDBPTransaction } from "idb";

import Migration from "../migration";

export default class JournalMoodDBAndEntryCreatedAtMigration extends Migration {
  version: number = 7;
  name: string = "JournalMoodDBAndEntryCreatedAt";

  async migrate(
    db: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    await this.createJournalMoodsDB(db);
    await this.populateCreatedAt(transaction);
  }

  async createJournalMoodsDB(db: IDBPDatabase<unknown>) {
    const journalMoodStore = db.createObjectStore("journal-moods", {
      keyPath: "id",
    });
    journalMoodStore.createIndex("date", "date", { unique: false });

    return journalMoodStore;
  }

  async populateCreatedAt(
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ) {
    const entriesStore = transaction.objectStore("journal");
    const oldEntries = await entriesStore.getAll();

    for (let entry of oldEntries) {
      entriesStore.put({
        ...entry,
        createdAt: new Date(),
      });
    }
  }
}
