import { ID } from "./ID";

export interface Event {
  id: ID;
  title: string;
  start: Date;
  end?: Date;
  frequency: Frequency;
  tagId: number;
}

export interface EventData {
  id: ID;
  title: string;
  start: string;
  end?: string;
  frequency: Frequency;
  tagId: number;
}

export interface UpdateEvent {
  title?: ID;
  start?: Date;
  end?: Date;
  frequency?: Frequency;
  tagId?: number;
}

export enum Frequency {
  Once = "once",
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Yearly = "yearly",
}
