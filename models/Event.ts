import { ID } from "./ID";

export interface Event {
  id: ID;
  description: string;
  title: string;
  start: Date;
  end?: Date;
  frequency: Frequency;
  tagId: ID;
}

export interface EventData {
  id: ID;
  description?: string;
  title: string;
  start: string;
  end?: string;
  frequency: Frequency;
  tagId: ID;
}

export interface UpdateEvent {
  title?: ID;
  description?: string;
  start?: Date;
  end?: Date;
  frequency?: Frequency;
  tagId?: ID;
}

export enum Frequency {
  Once = "once",
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Yearly = "yearly",
}
