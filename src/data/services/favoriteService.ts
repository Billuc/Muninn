import { injectable } from "tsyringe";

import Database from "../database/database";
import { Favorite } from "../models/Favorite";
import SubscribableService from "./base/subscribable";

import type { ID } from "../models/ID";

@injectable()
export class FavoriteService extends SubscribableService<Favorite> {
  constructor(database: Database) {
    super(database, "favorites");
  }

  async get(id: ID): Promise<Favorite> {
    const favorite = await this._get(id);
    return favorite;
  }

  async getAll(): Promise<Favorite[]> {
    const favorites = await this._getAll();
    return favorites;
  }

  async create(create: Favorite): Promise<Favorite> {
    const created = await this._create(create);
    return created;
  }

  async remove(id: ID): Promise<void> {
    await this._remove(id);
  }
}
