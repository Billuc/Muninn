import { type ID } from "./ID";

export interface JournalEntry {
  date: string;
  id: ID;
  text: string;
}

export interface CreateJournalEntry {
  date: Date;
  text: string;
}

export interface UpdateJournalEntry {
  id: ID;
  text?: string;
}
