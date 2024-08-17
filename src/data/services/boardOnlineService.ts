import axios from 'axios';
import { injectable } from 'tsyringe';

import Database from '../database/database';
import { Board } from '../models/Board';
import { SERVER_URL } from '../models/ServerData';
import SubscribableService from './base/subscribable';
import { ListOnlineService } from './listOnlineService';
import { NoteOnlineService } from './noteOnlineService';

import type { ID } from "../models/ID";

@injectable()
export class BoardOnlineService extends SubscribableService<Board> {
  constructor(
    database: Database,
    listOnlineService: ListOnlineService,
    noteOnlineService: NoteOnlineService
  ) {
    super(database, "boards");

    listOnlineService.subscribeEvents((act) => {
      if (act.action == "remove") {
        this.onNoteOrListRemoved(act.id);
      }
    });
    noteOnlineService.subscribeEvents((act) => {
      if (act.action == "remove") {
        this.onNoteOrListRemoved(act.id);
      }
    });
  }

  async get(id: ID): Promise<Board> {
    const boardResponse = await axios.get(`${SERVER_URL}/boards/${id}`);

    if (boardResponse.status !== 200) {
      throw new Error(boardResponse.statusText);
    }

    const storedBoard = await this._get(id);
    const board: Board = {
      ...storedBoard,
      ...boardResponse.data,
    };
    return board;
  }

  async import(id: ID): Promise<Board> {
    const boardResponse = await axios.get(`${SERVER_URL}/boards/${id}`);

    if (boardResponse.status !== 200) {
      throw new Error(boardResponse.statusText);
    }

    const imported = await this._create({
      id: boardResponse.data.id,
      title: boardResponse.data.title,
      cards: boardResponse.data.cards,
      online: true,
      tagId: "",
    });
    return imported;
  }

  async update(update: Board): Promise<Board> {
    const boardResponse = await axios.post(
      `${SERVER_URL}/boards/${update.id}`,
      {
        id: update.id,
        title: update.title,
        cards: update.cards,
      }
    );

    if (boardResponse.status !== 200) {
      throw new Error(boardResponse.statusText);
    }

    const updated = await this._update(update);
    return {
      ...updated,
      ...boardResponse.data,
    };
  }

  async unlink(id: ID): Promise<void> {
    await this._remove(id);
  }

  async onNoteOrListRemoved(id: ID): Promise<void> {
    const boards = await this._getAll();

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
