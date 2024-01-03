import type { ID } from "./ID";

export interface JournalMood {
  date: string;
  id: ID;
  mood: number;
}

export interface UpdateJournalMood {
  date: Date;
  id?: ID;
  mood: number;
}

export interface JournalEntry {
  date: string;
  id: ID;
  text: string;
  createdAt: Date;
}

export interface CreateJournalEntry {
  date: Date;
  text: string;
}

export interface UpdateJournalEntry {
  id: ID;
  text?: string;
}
