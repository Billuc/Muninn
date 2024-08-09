import { injectable } from "tsyringe";
import { v4 } from "uuid";

import Database from "../database/database";
import { Board, CreateBoard } from "../models/Board";
import SubscribableService from "./base/subscribable";

import type { ID } from "../models/ID";
@injectable()
export class BoardService extends SubscribableService<Board> {
  constructor(database: Database) {
    super(database, "boards");
  }

  async get(id: ID): Promise<Board> {
    const favorite = await this._get(id);
    return favorite;
  }

  async getAll(): Promise<Board[]> {
    const favorites = await this._getAll();
    return favorites;
  }

  async create(create: CreateBoard): Promise<Board> {
    const board: Board = {
      id: v4(),
      title: create.title,
      tagId: create.tagId,
      cards: create.cards ?? [],
    };
    const created = await this._create(board);
    return created;
  }

  async update(update: Board): Promise<Board> {
    const updated = await this._update(update);
    return updated;
  }

  async remove(id: ID): Promise<void> {
    await this._remove(id);
  }
}
