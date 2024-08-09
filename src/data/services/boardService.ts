import { injectable } from 'tsyringe';
import { v4 } from 'uuid';

import Database from '../database/database';
import { Board, CreateBoard } from '../models/Board';
import SubscribableService from './base/subscribable';
import { ListService } from './listService';
import { NoteService } from './noteService';

import type { ID } from "../models/ID";

@injectable()
export class BoardService extends SubscribableService<Board> {
  constructor(
    database: Database,
    listService: ListService,
    noteService: NoteService
  ) {
    super(database, "boards");

    listService.subscribeEvents((act) => {
      if (act.action == "remove") {
        this.onNoteOrListRemoved(act.id);
      }
    });
    noteService.subscribeEvents((act) => {
      if (act.action == "remove") {
        this.onNoteOrListRemoved(act.id);
      }
    });
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

  async onNoteOrListRemoved(id: ID): Promise<void> {
    const boards = await this.getAll();

    for (let board of boards) {
      let removed = false;
      for (let i = 0; i < board.cards.length; i++) {
        if (board.cards[i].id == id) {
          board.cards.splice(i, 1);
          removed = true;
        }
      }

      if (removed) {
        await this.update(board);
      }
    }
  }
}
