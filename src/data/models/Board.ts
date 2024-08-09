import { ID } from "./ID";
import { Tag } from "./Tag";

export interface Board {
  id: ID;
  title: string;
  tagId: ID;
  cards: Card[];
}

export interface BoardAndTag {
  id: ID;
  title: string;
  cards: Card[];
  tag: Tag | null;
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
