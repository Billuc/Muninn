import { SyncStatus } from "~/models/Status";
import { definePersistedStore } from "~/tools/persistedPinia";

export const useGeneralStore = definePersistedStore("general", {
  state: () => ({
    leftHanded: false,
    syncStatus: SyncStatus.Synced,
  }),
  actions: {
    setLeftHanded(value: boolean) {
      this.leftHanded = value;
    },
    setSyncStatus(status: SyncStatus) {
      this.syncStatus = status;
    },
  },
});
