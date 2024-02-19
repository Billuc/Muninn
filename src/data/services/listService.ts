import { injectable } from "tsyringe";
import { v4 } from "uuid";

import Database from "../database/database";
import SubscribableService from "./base/subscribable";

import type { CreateList, List } from "../models/List";
import type { ID } from "../models/ID";

@injectable()
export class ListService extends SubscribableService<List> {
  constructor(database: Database) {
    super(database, "lists");
  }

  async get(id: ID): Promise<List> {
    const list = await this._get(id);
    return list;
  }

  async getAll(): Promise<List[]> {
    const lists = await this._getAll();
    return lists;
  }

  async create(create: CreateList): Promise<List> {
    const list: List = {
      id: v4(),
      title: create.title,
      hideChecked: true,
    };
    const created = await this._create(list);
    return created;
  }

  async update(update: List): Promise<List> {
    const updated = await this._update(update);
    return updated;
  }

  async remove(id: ID): Promise<void> {
    await this._remove(id);
  }
}
