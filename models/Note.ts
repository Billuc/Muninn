import { ID } from "./ID";

export interface Note {
  id: ID;
  title: string;
  tagId: ID;
  text: string;
}
