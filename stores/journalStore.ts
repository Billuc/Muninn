import { defineStore } from "pinia";
import { format } from "date-fns";

export const useJournalStore = defineStore("journal", {
  state: () => ({
    entries: {} as { [key: string]: string[] },
  }),
  actions: {
    getEntries(key: Date) {
      const keyAsString = format(key, "yyyy-MM-dd");
      return this.entries[keyAsString];
    },
    newEntry(key: Date, entry: string) {
      const keyAsString = format(key, "yyyy-MM-dd");
      if (this.entries[keyAsString] === undefined) {
        this.entries[keyAsString] = [];
      }

      this.entries[keyAsString].push(entry);
    },
    editEntry(key: Date, index: number, entry: string) {
      const keyAsString = format(key, "yyyy-MM-dd");
      if (this.entries[keyAsString] === undefined) {
        throw new Error(`[Journal] Key ${key} not found`);
      }
      if (this.entries[keyAsString][index] === undefined) {
        throw new Error(`[Journal] Index ${index} out of range for key ${key}`);
      }
      this.entries[keyAsString].splice(index, 1, entry);
    },
    removeEntry(key: Date, index: number) {
      const keyAsString = format(key, "yyyy-MM-dd");
      if (this.entries[keyAsString] === undefined) {
        throw new Error(`[Journal] Key ${key} not found`);
      }
      if (this.entries[keyAsString][index] === undefined) {
        throw new Error(`[Journal] Index ${index} out of range for key ${key}`);
      }
      this.entries[keyAsString].splice(index, 1);
    },
  },
  persist: true,
});
