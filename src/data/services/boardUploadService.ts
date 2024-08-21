import axios from 'axios';
import { injectable } from 'tsyringe';

import { Board } from '../models/Board';
import { List, ListElement } from '../models/List';
import { Note } from '../models/Note';
import { SERVER_URL } from '../models/ServerData';
import { BoardService } from './boardService';
import { ListElementService } from './listElementService';
import { ListService } from './listService';
import { NoteService } from './noteService';

import type { ID } from "../models/ID";
@injectable()
export class BoardUploadService {
  private _boardService: BoardService;
  private _noteService: NoteService;
  private _listService: ListService;
  private _listElementService: ListElementService;

  constructor(
    boardService: BoardService,
    noteService: NoteService,
    listService: ListService,
    listElementService: ListElementService
  ) {
    this._boardService = boardService;
    this._noteService = noteService;
    this._listService = listService;
    this._listElementService = listElementService;
  }

  async upload(id: ID): Promise<Board> {
    const board = await this._boardService.get(id);
    const notes: Note[] = [];
    const lists: { list: List; elements: ListElement[] }[] = [];

    for (let c of board.cards) {
      switch (c.type) {
        case "list":
          const list = await this._listService.get(c.id);
          const elements = await this._listElementService.getAllChildren(c.id);
          lists.push({ list, elements });
          break;
        case "note":
          notes.push(await this._noteService.get(c.id));
      }
    }

    const boardResponse = await axios.post(`${SERVER_URL}/boards/upload`, {
      board,
      lists,
      notes,
    });

    if (boardResponse.status !== 200) {
      throw new Error(boardResponse.statusText);
    }

    await this._boardService.update({
      ...board,
      online: true,
    });

    return boardResponse.data;
  }
}
