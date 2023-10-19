import { ID } from "./ID";

export interface JournalEntry {
  date: Date;
  id: ID;
  text: string;
}
