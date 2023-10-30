import { IDBPDatabase, IDBPTransaction } from "idb";
import Migration from "../migration";
import { deserializeWithMaps } from "./serializer";

export default class MigrateJournalMigration extends Migration {
  version: number = 1;
  name: string = "MigrateJournal";

  async migrate(
    db: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    if (db.objectStoreNames.contains("journal")) return;

    const journalStore = db.createObjectStore("journal", { keyPath: "id" });
    journalStore.createIndex("date", "date", { unique: false });

    const localJournal = localStorage.getItem("__persisted__journal");
    if (!localJournal) {
      console.warn("No journal in localStorage");
      return;
    }

    const journalState = deserializeWithMaps(localJournal);
    const journalEntries: Map<
      string,
      Map<
        string,
        {
          date: string;
          id: string;
          text: string;
        }
      >
    > = journalState.entries;

    for (const dateEntries of journalEntries) {
      for (const entry of dateEntries[1]) {
        const journalEntry = {
          id: entry[1].id,
          date: new Date(entry[1].date),
          text: entry[1].date,
        };
        await journalStore.add(journalEntry);
      }
    }
  }
}
