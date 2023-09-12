import { format } from "date-fns";
import { definePersistedStore } from "~/tools/persistedPinia";

const keyAsString = (key: Date) => format(key, "yyyy-MM-dd");

export const useJournalStore = definePersistedStore("journal", {
  state: () => ({
    entries: new Map<string, string[]>(),
  }),
  actions: {
    getEntries(key: Date) {
      return this.entries.get(keyAsString(key));
    },
    newEntry(key: Date, entry: string) {
      const stringKey = keyAsString(key);

      if (!this.entries.has(stringKey)) {
        this.entries.set(stringKey, []);
      }

      this.entries.get(stringKey)!.push(entry);
    },
    editEntry(key: Date, index: number, entry: string) {
      const entriesArray = this.entries.get(keyAsString(key))

      if (!entriesArray) {
        throw new Error(`[Journal] Key ${key} not found`);
      }

      if (entriesArray[index] === undefined) {
        throw new Error(`[Journal] Index ${index} out of range for key ${key}`);
      }
      entriesArray.splice(index, 1, entry);
    },
    removeEntry(key: Date, index: number) {
      const entriesArray = this.entries.get(keyAsString(key))

      if (!entriesArray) {
        throw new Error(`[Journal] Key ${key} not found`);
      }

      if (entriesArray[index] === undefined) {
        throw new Error(`[Journal] Index ${index} out of range for key ${key}`);
      }
      entriesArray.splice(index, 1);
    },
  },
});
