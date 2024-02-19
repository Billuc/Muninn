import { injectable } from "tsyringe";
import { v4 } from "uuid";

import Database from "../database/database";
import SubscribableService from "./base/subscribable";

import type { Tag, CreateTag } from "../models/Tag";
import type { ID } from "../models/ID";
@injectable()
export class EventTagService extends SubscribableService<Tag> {
  constructor(database: Database) {
    super(database, "event-tags");
  }

  async get(id: ID): Promise<Tag> {
    const tag = await this._get(id);
    return tag;
  }

  async getAll(): Promise<Tag[]> {
    const tags = await this._getAll();
    return tags;
  }

  async create(create: CreateTag): Promise<Tag> {
    const tag: Tag = {
      id: v4(),
      title: create.title,
      color: create.color,
      icon: create.icon,
    };
    const created = await this._create(tag);
    return created;
  }

  async update(update: Tag): Promise<Tag> {
    const updated = await this._update(update);
    return updated;
  }

  async remove(id: ID): Promise<void> {
    await this._remove(id);
  }
}
