import { defineStore, type DefineStoreOptions, type StateTree } from "pinia";
import { deserializeWithMaps, serializeWithMaps } from "./serializer";

export function definePersistedStore<
  Id extends string,
  S extends StateTree,
  G,
  A
>(id: string, options: Omit<DefineStoreOptions<Id, S, G, A>, "id" | "persist">) {
  return defineStore(id, {
    ...options,
    persist: {
      key: (storeId) => `__persisted__${storeId}`,
      storage: persistedState.localStorage,
      serializer: {
        serialize: serializeWithMaps,
        deserialize: deserializeWithMaps,
      },
    },
  });
}
