import { ID } from "./ID";

export interface JournalEntry {
  date: Date;
  id: ID;
  text: string;
}

export interface JournalEntryDTO {
  date: string;
  id: ID;
  text: string;
}
