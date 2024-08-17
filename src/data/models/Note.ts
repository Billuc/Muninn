import type { ID } from "./ID";
import { Tag } from './Tag';

export interface Note {
  id: ID;
  title: string;
  tagId?: ID;
  text: string;
}

export interface NoteAndTag {
  id: ID;
  title: string;
  text: string;
  tag: Tag | null;
}

export interface CreateNote {
  title: string;
  tagId?: ID;
  text: string;
}
