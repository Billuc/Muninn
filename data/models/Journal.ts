import { ID } from "./ID";

export interface JournalEntry {
  date: Date;
  id: ID;
  text: string;
}

export interface CreateJournalEntry {
  date: Date;
  text: string;
}