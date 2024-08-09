import { injectable } from 'tsyringe';

import Database from '../database/database';
import { Favorite } from '../models/Favorite';
import SubscribableService from './base/subscribable';
import { BoardService } from './boardService';

import type { ID } from "../models/ID";
@injectable()
export class FavoriteService extends SubscribableService<Favorite> {
  constructor(database: Database, boardService: BoardService) {
    super(database, "favorites");

    boardService.subscribeEvents((act) => {
      if (act.action == "remove") {
        this.onBoardRemoved(act.id);
      }
    });
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

  async onBoardRemoved(id: string) {
    const favorite = await this.get(id);

    if (!!favorite) {
      await this.remove(id);
    }
  }
}
