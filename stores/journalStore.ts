import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { ID } from "~/models/ID";
import { JournalEntry } from "~/models/Journal";
import { definePersistedStore } from "~/tools/persistedPinia";

const keyAsString = (key: Date) => format(key, "yyyy-MM-dd");

export const useJournalStore = definePersistedStore("journal", {
  state: () => ({
    entries: new Map<string, Map<ID, JournalEntry>>(),
  }),
  actions: {
    getEntries(key: Date) {
      return this.entries.get(keyAsString(key));
    },
    newEntry(key: Date, entry: string) {
      const stringKey = keyAsString(key);

      if (!this.entries.has(stringKey)) {
        this.entries.set(stringKey, new Map<ID, JournalEntry>());
      }

      const journalEntry = {
        date: key,
        id: uuidv4(),
        text: entry,
      };

      this.entries.get(stringKey)!.set(journalEntry.id, journalEntry);
    },
    editEntry(key: Date, id: ID, entry: string) {
      if (!this.entries.has(keyAsString(key))) {
        throw new Error(`[Journal] Key ${key} not found`);
      }

      const daysEntries = this.entries.get(keyAsString(key))!;

      if (!daysEntries.has(id)) {
        throw new Error(`[Journal] Entry with ID ${id} not found`);
      }
      daysEntries.set(id, { date: key, id, text: entry });
    },
    removeEntry(key: Date, id: ID) {
      if (!this.entries.has(keyAsString(key))) {
        throw new Error(`[Journal] Key ${key} not found`);
      }

      if (!this.entries.get(keyAsString(key))!.delete(id))
        throw new Error(`[Journal] Entry with ID ${id} not found`);
    },
  },
});
