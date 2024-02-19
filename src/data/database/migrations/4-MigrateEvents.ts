import type { IDBPDatabase, IDBPObjectStore, IDBPTransaction } from "idb";
import { parse } from "date-fns";

import Migration from "../migration";
import { deserializeWithMaps } from "./serializer";

export default class MigrateEventsMigration extends Migration {
  version: number = 4;
  name: string = "MigrateEvents";

  async migrate(
    db: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): Promise<undefined> {
    const eventStore = this.getOrCreateEventStore(db, transaction);
    const eventTagStore = this.getOrCreateEventTagStore(db, transaction);
    await this.copyFromLocalStorage(eventStore, eventTagStore);
  }

  getOrCreateEventStore(
    db: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): IDBPObjectStore<unknown, ArrayLike<string>, "events", "versionchange"> {
    if (db.objectStoreNames.contains("events"))
      return transaction.objectStore("events");

    return db.createObjectStore("events", { keyPath: "id" });
  }

  getOrCreateEventTagStore(
    db: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, ArrayLike<string>, "versionchange">
  ): IDBPObjectStore<
    unknown,
    ArrayLike<string>,
    "event-tags",
    "versionchange"
  > {
    if (db.objectStoreNames.contains("event-tags"))
      return transaction.objectStore("event-tags");

    return db.createObjectStore("event-tags", { keyPath: "id" });
  }

  async copyFromLocalStorage(
    eventStore: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "events",
      "versionchange"
    >,
    eventTagStore: IDBPObjectStore<
      unknown,
      ArrayLike<string>,
      "event-tags",
      "versionchange"
    >
  ) {
    const localEvents = localStorage.getItem("__persisted__events");
    if (!localEvents) {
      console.warn("No event in localStorage");
      return;
    }

    const eventState = deserializeWithMaps(localEvents);
    const events: Map<
      string,
      {
        id: string;
        description?: string;
        title: string;
        start: string;
        end?: string;
        frequency: string;
        frequencyMultiplier: number;
        tagId: string;
      }
    > = eventState.events;

    const tags: Map<
      string,
      {
        id: string;
        title: string;
        color: string;
        icon: string[];
      }
    > = eventState.tags;

    for (const [_, event] of events) {
      await eventStore.add({
        id: event.id,
        description: event.description,
        title: event.title,
        start: parse(event.start, "yyyy-MM-dd HH:mm", new Date()),
        end: event.end
          ? parse(event.end, "yyyy-MM-dd HH:mm", new Date())
          : undefined,
        frequency: event.frequency,
        frequencyMultiplier: event.frequencyMultiplier,
        tagId: event.tagId,
      });
    }

    for (const [_, tag] of tags) {
      await eventTagStore.add({
        id: tag.id,
        title: tag.title,
        color: tag.color,
        icon: tag.icon,
      });
    }
  }
}
