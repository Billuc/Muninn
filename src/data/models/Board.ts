import { ID } from "./ID";

export interface Board {
  id: ID;
  title: string;
  tagId: ID;
  cards: Card[];
}

export interface Card {
  id: ID;
  type: CardType;
}

export enum CardType {
  List = "list",
  Note = "note",
}

export interface CreateBoard {
  title: string;
  tagId: ID;
  cards?: Card[];
}
