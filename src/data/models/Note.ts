import { type ID } from "./ID";

export interface Note {
  id: ID;
  title: string;
  tagId: ID;
  text: string;
}

export interface CreateNote {
  title: string;
  tagId: ID;
  text: string;
}
