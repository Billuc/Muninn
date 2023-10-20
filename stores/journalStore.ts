import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { ID } from "~/models/ID";
import { JournalEntry, JournalEntryDTO } from "~/models/Journal";
import { definePersistedStore } from "~/tools/persistedPinia";

const keyAsString = (key: Date) => format(key, "yyyy-MM-dd");

export const useJournalStore = definePersistedStore("journal", {
  state: () => ({
    entries: new Map<string, Map<ID, JournalEntryDTO>>(),
  }),
  actions: {
    getEntries(key: Date): JournalEntry[] {
      return [...(this.entries.get(keyAsString(key))?.values() ?? [])].map(
        (entry: JournalEntryDTO) => ({
          date: new Date(entry.date),
          id: entry.id,
          text: entry.text,
        })
      );
    },
    newEntry(key: Date, entry: string) {
      const stringKey = keyAsString(key);

      if (!this.entries.has(stringKey)) {
        this.entries.set(stringKey, new Map<ID, JournalEntryDTO>());
      }

      const journalEntry = {
        date: stringKey,
        id: uuidv4(),
        text: entry,
      };

      this.entries.get(stringKey)!.set(journalEntry.id, journalEntry);
    },
    editEntry(key: Date, id: ID, entry: string) {
      const stringKey = keyAsString(key);

      if (!this.entries.has(stringKey)) {
        throw new Error(`[Journal] Key ${stringKey} not found`);
      }

      const daysEntries = this.entries.get(stringKey)!;

      if (!daysEntries.has(id)) {
        throw new Error(`[Journal] Entry with ID ${id} not found`);
      }
      daysEntries.set(id, { date: stringKey, id, text: entry });
    },
    removeEntry(key: Date, id: ID) {
      const stringKey = keyAsString(key);

      if (!this.entries.has(stringKey)) {
        throw new Error(`[Journal] Key ${stringKey} not found`);
      }

      if (!this.entries.get(stringKey)!.delete(id))
        throw new Error(`[Journal] Entry with ID ${id} not found`);
    },
  },
});
