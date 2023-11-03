import _ from "lodash";
import { v4 } from "uuid";
import Database from "../database/database";
import type { Event, CreateEvent } from "../models/Event";
import type { ID } from "../models/ID";
import SubscribableService from "./base/subscribable";
import { injectable } from "tsyringe";

@injectable()
export class EventService extends SubscribableService<Event> {
  constructor(database: Database) {
    super(database, "events");
  }

  async get(id: ID): Promise<Event> {
    const event = await this._get(id);
    return event;
  }

  async getAll(): Promise<Event[]> {
    const events = await this._getAll();
    return events;
  }

  async getAllForDay(day: Date): Promise<Event[]> {
    const allEvents = await this._getAll();

    const eventsForDay = _.filter(allEvents, (ev) =>
      hasRepetitionAtDay(ev, day)
    );
    return eventsForDay;
  }

  async create(create: CreateEvent): Promise<Event> {
    const event: Event = {
      id: v4(),
      title: create.title,
      description: create.description,
      frequency: create.frequency,
      frequencyMultiplier: create.frequencyMultiplier,
      start: create.start,
      end: create.end,
      tagId: create.tagId,
    };
    const created = await this._create(event);
    return created;
  }

  async update(update: Event): Promise<Event> {
    const updated = await this._update(update);
    return updated;
  }

  async remove(id: ID): Promise<void> {
    await this._remove(id);
  }
}
